// src/lib/mail.ts
import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.MAIL_FROM || 'Netxpert <no-reply@netxpert.com>'

if (!resendApiKey) {
  console.warn('⚠️ RESEND_API_KEY não configurado. E-mails não serão enviados.')
}

const resend = resendApiKey ? new Resend(resendApiKey) : null

type SendEmailParams = {
  to: string | string[]
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  if (!resend) {
    console.warn('Resend não inicializado. Abortando envio de e-mail.')
    return
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
    })
  } catch (err) {
    console.error('Erro ao enviar e-mail via Resend:', err)
  }
}
