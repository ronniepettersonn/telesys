import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { sendEmail } from "@/lib/mail";
import { contractInviteTemplate } from "@/lib/email/templates/contractInvite";
import { internalNotificationTemplate } from "@/lib/email/templates/internalNotification";

// helper simples para formatar a data como dd/mm/aaaa
function formatDate(date: Date) {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear().toString();
  return `${d}/${m}/${y}`;
}

// helper para garantir formato 0,00 (sem "R$")
function formatMoney(value: number | string) {
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return "0,00";
  return num.toFixed(2).replace(".", ",");
}

// Converte texto plano do contrato em HTML simples, com quebras melhores
function contractTextToHtml(text: string) {
  if (!text) return ''

  let t = text

  // 1) Forçar quebra de linha antes de bullets "- "
  //    Ex.: " - Disponibilizar acesso" -> "\n- Disponibilizar acesso"
  t = t.replace(/\s-\s/g, '\n- ')

  // 2) Forçar quebra de linha antes de itens numerados "1. ", "2. ", etc
  //    Ex.: " 1. O cancelamento" -> "\n1. O cancelamento"
  t = t.replace(/\s([1-9]\.\s)/g, '\n$1')

  // 3) Escapar HTML básico
  const escaped = t
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // 4) Quebra em parágrafos por linhas vazias (duas ou mais quebras)
  const paragraphs = escaped.split(/\n{2,}/)

  // 5) Dentro de cada parágrafo, uma quebra de linha simples vira <br />
  const htmlParagraphs = paragraphs.map((p) => {
    const withBr = p.replace(/\n/g, '<br />')
    return `<p>${withBr}</p>`
  })

  return htmlParagraphs.join('\n\n')
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      templateSlug,
      clientName,
      clientEmail,
      clientDocument,
      clientAddress,
      clientPhone,
      systemName,
      planName,
      planValue, // novo
      startDate,
    } = body;

    // validação básica
    if (
      !templateSlug ||
      !clientName ||
      !clientEmail ||
      !clientDocument ||
      !clientAddress ||
      !clientPhone ||
      !systemName ||
      !planName ||
      !planValue ||
      !startDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1) Buscar template
    const template = await prisma.contractTemplate.findUnique({
      where: { slug: templateSlug },
    });

    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    // 2) Gerar token e montar URL de assinatura
    const token = randomBytes(32).toString("hex");
    const signUrl = `${process.env.APP_URL}/contrato/assinar/${token}`;

    const startDateObj = new Date(startDate);
    const dataAssinaturaStr = formatDate(startDateObj);
    const valorMensalStr = formatMoney(planValue);

    // 3) Preencher o template com os placeholders
    let filledContent = template.content;

    filledContent = filledContent
      .replace(/{{NOME_DO_CLIENTE}}/g, clientName)
      .replace(/{{DOCUMENTO_DO_CLIENTE}}/g, clientDocument)
      .replace(/{{ENDERECO_DO_CLIENTE}}/g, clientAddress)
      .replace(/{{EMAIL_DO_CLIENTE}}/g, clientEmail)
      .replace(/{{TELEFONE_DO_CLIENTE}}/g, clientPhone)
      .replace(/{{PLANO}}/g, planName)
      .replace(/{{VALOR_MENSAL}}/g, valorMensalStr)
      .replace(/{{DATA_ASSINATURA}}/g, dataAssinaturaStr)
      .replace(/{{TOKEN_ASSINATURA}}/g, token);

    // 🔹 transforma o texto preenchido em HTML
    const htmlContent = contractTextToHtml(filledContent);

    // 4) Criar instância do contrato
    const instance = await prisma.contractInstance.create({
      data: {
        templateId: template.id,
        clientName,
        clientEmail,
        clientDocument,
        clientAddress,
        clientPhone,
        systemName,
        planName,
        planValue: planValue.toString(),
        startDate: startDateObj,
        token,
        content: htmlContent, // ⬅️ agora salvando HTML
      },
    });

    // 5) E-mail para o cliente com link de assinatura
    await sendEmail({
      to: clientEmail,
      subject: `Assinatura de contrato - ${systemName}`,
      html: contractInviteTemplate({
        clientName,
        systemName,
        planName,
        signUrl,
      }),
    });

    // 6) (Opcional) E-mail interno avisando que contrato foi gerado
    const internalEmail = process.env.MAIL_INTERNAL;
    if (internalEmail) {
      await sendEmail({
        to: internalEmail,
        subject: `Novo contrato criado - ${systemName}`,
        html: internalNotificationTemplate({
          type: "CREATED",
          clientName,
          clientEmail,
          clientDocument,
          systemName,
          planName,
        }),
      });
    }

    return NextResponse.json({
      ok: true,
      id: instance.id,
      signUrl,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error creating contract:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
