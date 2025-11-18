import { emailBase } from './emailBase'

export function contractInviteTemplate({
  clientName,
  systemName,
  planName,
  signUrl,
}: {
  clientName: string
  systemName: string
  planName: string
  signUrl: string
}) {
  return emailBase({
    title: `Assinatura de contrato - ${systemName}`,
    content: `
      <p>Olá <strong>${clientName}</strong>,</p>

      <p>
        Você recebeu um contrato de prestação de serviços da <strong>Netxpert</strong>
        referente ao sistema <strong>${systemName}</strong> (${planName}).
      </p>

      <p style="margin-top: 24px; text-align: center;">
        <a href="${signUrl}" target="_blank" style="
          background-color: #f59e0b;
          color: #0f172a;
          padding: 12px 22px;
          border-radius: 8px;
          font-size: 15px;
          text-decoration: none;
          font-weight: bold;
          display: inline-block;
        ">
          Acessar contrato para leitura e assinatura
        </a>
      </p>

      <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
        Se o botão não funcionar, copie e cole este link no navegador:<br />
        <span style="font-family: monospace; color: #f8fafc;">${signUrl}</span>
      </p>
    `,
  })
}
