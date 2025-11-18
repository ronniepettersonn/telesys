import { emailBase } from './emailBase'

export function internalNotificationTemplate({
  clientName,
  clientEmail,
  clientDocument,
  systemName,
  planName,
  pdfUrl,
  type,
}: {
  clientName: string
  clientEmail: string
  clientDocument: string
  systemName: string
  planName: string
  pdfUrl?: string
  type: 'CREATED' | 'SIGNED'
}) {
  const title =
    type === 'CREATED'
      ? `Novo contrato criado - ${systemName}`
      : `Contrato assinado - ${systemName}`

  const action =
    type === 'CREATED'
      ? 'Um novo contrato foi gerado e aguarda assinatura.'
      : 'Um contrato foi assinado pelo cliente.'

  return emailBase({
    title,
    content: `
      <p>${action}</p>

      <ul style="margin-top: 16px; line-height: 1.7; color: #e2e8f0;">
        <li><strong>Cliente:</strong> ${clientName}</li>
        <li><strong>E-mail:</strong> ${clientEmail}</li>
        <li><strong>CPF/CNPJ:</strong> ${clientDocument}</li>
        <li><strong>Sistema:</strong> ${systemName}</li>
        <li><strong>Plano:</strong> ${planName}</li>
      </ul>

      ${
        pdfUrl
          ? `
      <p style="margin-top: 20px; font-size: 12px;">
        Link do PDF:<br />
        <span style="font-family: monospace; color: #f8fafc;">${pdfUrl}</span>
      </p>`
          : ''
      }
    `,
  })
}
