export function emailBase({
  title,
  content,
}: {
  title: string
  content: string
}) {
  return `
  <div style="
    background-color: #0f172a;
    color: #e2e8f0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen;
    padding: 40px 0;
  ">
    <div style="
      max-width: 560px;
      margin: 0 auto;
      background-color: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 32px;
    ">
      
      <h1 style="
        margin: 0 0 20px 0;
        font-size: 22px;
        font-weight: 600;
        color: #f1f5f9;
        text-align: center;
      ">
        ${title}
      </h1>

      <div style="
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 30px;
        color: #cbd5e1;
      ">
        ${content}
      </div>

      <div style="
        text-align: center;
        margin-top: 30px;
        font-size: 12px;
        color: #94a3b8;
      ">
        Netxpert Tecnologia<br />
        Este e-mail foi enviado automaticamente, por favor não responda.
      </div>

    </div>
  </div>
  `
}
