import { emailBase } from './emailBase'

export function contractSignedTemplate({
  clientName,
  systemName,
  planName,
  pdfUrl,
}: {
  clientName: string
  systemName: string
  planName: string
  pdfUrl: string
}) {
  return emailBase({
    title: `Contrato assinado - ${systemName}`,
    content: `
      <p>Olá <strong>${clientName}</strong>,</p>

      <p>
        Seu contrato de prestação de serviços referente ao sistema
        <strong>${systemName}</strong> (${planName}) foi assinado com sucesso.
      </p>

      <p style="margin-top: 24px; text-align: center;">
        <a href="${pdfUrl}" target="_blank" style="
          background-color: #f59e0b;
          color: #0f172a;
          padding: 12px 22px;
          border-radius: 8px;
          font-size: 15px;
          text-decoration: none;
          font-weight: bold;
          display: inline-block;
        ">
          Baixar contrato em PDF
        </a>
      </p>

      <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
        Se o botão não funcionar, copie e cole este link no navegador:
        <br />
        <span style="font-family: monospace; color: #f8fafc;">${pdfUrl}</span>
      </p>
    `,
  })
}
