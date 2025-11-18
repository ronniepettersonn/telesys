import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createContractPdf } from "@/lib/createContractPdf";
import { uploadContractPdf } from "@/lib/uploadContractPdf";
import { sendEmail } from "@/lib/mail";
import { contractSignedTemplate } from "@/lib/email/templates/contractSigned";
import { internalNotificationTemplate } from "@/lib/email/templates/internalNotification";

function renderTemplate(content: string, vars: Record<string, string>) {
  let result = content;

  Object.entries(vars).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    result = result.replace(regex, value);
  });

  return result;
}

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token é obrigatório." },
        { status: 400 }
      );
    }

    const instance = await prisma.contractInstance.findUnique({
      where: { token },
      include: { template: true },
    });

    if (!instance) {
      return NextResponse.json(
        { error: "Contrato não encontrado." },
        { status: 404 }
      );
    }

    const alreadySigned = instance.status === "SIGNED";
    const now = new Date();

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const userAgent = req.headers.get("user-agent") || "unknown";

    // 1) Renderizar o conteúdo do contrato com variáveis
    const formattedStartDate = instance.startDate.toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });

    const renderedContent = renderTemplate(instance.template.content, {
      clientName: instance.clientName,
      clientDocument: instance.clientDocument,
      systemName: instance.systemName,
      planName: instance.planName,
      startDate: formattedStartDate,
    });

    const signedAtDate =
      alreadySigned && instance.signedAt ? instance.signedAt : now;

    // 2) Gerar PDF com layout melhorado
    const pdfBytes = await createContractPdf({
      content: renderedContent,
      clientName: instance.clientName,
      clientEmail: instance.clientEmail,
      clientDocument: instance.clientDocument,
      systemName: instance.systemName,
      planName: instance.planName,
      startDate: formattedStartDate,
      signedAt: signedAtDate,
      signerIp: ip,
    });

    // 3) Upload para Supabase
    const pdfUrl = await uploadContractPdf(instance.id, pdfBytes);

    // 4) Atualizar o registro no banco
    const updated = await prisma.contractInstance.update({
      where: { id: instance.id },
      data: {
        status: "SIGNED",
        signedAt: signedAtDate,
        signerIp: alreadySigned && instance.signerIp ? instance.signerIp : ip,
        signerUserAgent:
          alreadySigned && instance.signerUserAgent
            ? instance.signerUserAgent
            : userAgent,
        pdfUrl,
      },
    });

    // 5) E-mails automáticos

    // 5.1 E-mail para o cliente com link do contrato
    await sendEmail({
      to: instance.clientEmail,
      subject: `Contrato assinado - ${instance.systemName}`,
      html: contractSignedTemplate({
        clientName: instance.clientName,
        systemName: instance.systemName,
        planName: instance.planName,
        pdfUrl: updated.pdfUrl!,
      }),
    });

    // 5.2 E-mail interno notificando assinatura
    const internalEmail = process.env.MAIL_INTERNAL;
    if (internalEmail) {
      await sendEmail({
        to: internalEmail,
        subject: `Contrato assinado - ${instance.systemName}`,
        html: internalNotificationTemplate({
          type: "SIGNED",
          clientName: instance.clientName,
          clientEmail: instance.clientEmail,
          clientDocument: instance.clientDocument,
          systemName: instance.systemName,
          planName: instance.planName,
          pdfUrl: updated.pdfUrl!,
        }),
      });
    }

    return NextResponse.json({ ok: true, pdfUrl: updated.pdfUrl });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error signing contract:", err);
    return NextResponse.json(
      { error: "Erro interno ao registrar assinatura." },
      { status: 500 }
    );
  }
}
