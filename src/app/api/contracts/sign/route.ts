import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createContractPdf } from "@/lib/createContractPdf";
import { uploadContractPdf } from "@/lib/uploadContractPdf";
import { sendEmail } from "@/lib/mail";
import { contractSignedTemplate } from "@/lib/email/templates/contractSigned";
import { internalNotificationTemplate } from "@/lib/email/templates/internalNotification";

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

    // data de início formatada pt-BR
    const formattedStartDate = instance.startDate.toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });

    // valor mensal formatado pt-BR
    const formattedPlanValue =
      instance.planValue &&
      `R$ ${instance.planValue
        .toNumber()
        .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

    const signedAtDate =
      alreadySigned && instance.signedAt ? instance.signedAt : now;

    // 1) Gerar PDF com o HTML do contrato já preenchido
    const pdfBytes = await createContractPdf({
      content: instance.content, // HTML salvo na instância
      clientName: instance.clientName,
      clientEmail: instance.clientEmail,
      clientDocument: instance.clientDocument,
      clientAddress: instance.clientAddress,
      clientPhone: instance.clientPhone,
      systemName: instance.systemName,
      planName: instance.planName,
      planValue: formattedPlanValue || "—",
      startDate: formattedStartDate,
      signedAt: signedAtDate,
      signerIp: ip,
    });

    // 2) Upload para Supabase
    const pdfUrl = await uploadContractPdf(instance.id, pdfBytes);

    // 3) Atualizar o registro no banco
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

    // 4) E-mails automáticos

    // 4.1 E-mail para o cliente com link do contrato
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

    // 4.2 E-mail interno notificando assinatura
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
