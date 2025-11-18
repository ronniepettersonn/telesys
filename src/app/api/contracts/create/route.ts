import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { sendEmail } from "@/lib/mail";
import { contractInviteTemplate } from "@/lib/email/templates/contractInvite";
import { internalNotificationTemplate } from "@/lib/email/templates/internalNotification";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      templateSlug,
      clientName,
      clientEmail,
      clientDocument,
      systemName,
      planName,
      startDate,
    } = body;

    if (
      !templateSlug ||
      !clientName ||
      !clientEmail ||
      !clientDocument ||
      !systemName ||
      !planName ||
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

    // 2) Criar instância + token
    const token = randomBytes(32).toString("hex");

    const instance = await prisma.contractInstance.create({
      data: {
        templateId: template.id,
        clientName,
        clientEmail,
        clientDocument,
        systemName,
        planName,
        startDate: new Date(startDate),
        token,
      },
    });

    const signUrl = `${process.env.APP_URL}/contrato/assinar/${token}`;

    // 3) E-mail para o cliente com link de assinatura
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

    // (Opcional) E-mail interno avisando que contrato foi gerado
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
