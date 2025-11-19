import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

type CreateContractPdfParams = {
  content: string; // HTML salvo em ContractInstance.content

  clientName: string;
  clientEmail: string;
  clientDocument: string;
  clientAddress: string;
  clientPhone: string;

  systemName: string;
  planName: string;
  planValue: string; // "R$ 560,50"
  startDate: string; // pt-BR

  signedAt: Date;
  signerIp?: string;
};

// Converte HTML simples do contrato em texto plano com quebras
function htmlToPlainText(html: string): string {
  if (!html) return "";

  let text = html;

  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<\/p>/gi, "\n\n");
  text = text.replace(/<p[^>]*>/gi, "");

  text = text.replace(/&nbsp;/gi, " ");
  text = text.replace(/&amp;/gi, "&");
  text = text.replace(/&lt;/gi, "<");
  text = text.replace(/&gt;/gi, ">");

  text = text.replace(/<\/?[^>]+(>|$)/g, "");
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

export async function createContractPdf({
  content,
  clientName,
  clientEmail,
  clientDocument,
  clientAddress,
  clientPhone,
  systemName,
  planName,
  planValue,
  startDate,
  signedAt,
  signerIp,
}: CreateContractPdfParams): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // carrega a logo (public/pdf/netxpert-logo.png)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let logoImage: any = null;
  try {
    const logoPath = path.join(
      process.cwd(),
      "public",
      "pdf",
      "netxpert-logo.png"
    );
    const logoBytes = fs.readFileSync(logoPath);
    logoImage = await pdfDoc.embedPng(logoBytes);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.warn("Não foi possível carregar a logo da Netxpert para o PDF.");
  }

  // Margens mais folgadas para não bater no rodapé
  const topMargin = 95; // distância entre topo físico e início do texto
  const bottomMargin = 120; // limite até onde o texto pode ir

  const fontSize = 10;
  const leftMargin = 60;
  const rightMargin = 60;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pages: any[] = [];

  let page = pdfDoc.addPage();
  pages.push(page);

  let { width, height } = page.getSize();
  let cursorY = height - topMargin;
  let pageNumber = 1;

  const primaryBlue = rgb(0 / 255, 32 / 255, 80 / 255);

  // === helpers de layout ===

  const drawHeader = (p: typeof page, isFirst: boolean) => {
    const { width: pw, height: ph } = p.getSize();

    // faixa azul superior mais fina
    const barHeight = 45;
    p.drawRectangle({
      x: 0,
      y: ph - barHeight,
      width: pw,
      height: barHeight,
      color: primaryBlue,
    });

    // logo centralizada e menor (escala dinâmica para caber no width)
    if (logoImage) {
      const maxLogoWidth = pw * 0.35; // 35% da largura da página
      const maxLogoHeight = 28; // altura máxima da logo no cabeçalho

      const scale = Math.min(
        maxLogoWidth / logoImage.width,
        maxLogoHeight / logoImage.height
      );

      const logoWidth = logoImage.width * scale;
      const logoHeight = logoImage.height * scale;

      const logoX = pw / 2 - logoWidth / 2;
      const logoY = ph - barHeight / 2 - logoHeight / 2;

      p.drawImage(logoImage, {
        x: logoX,
        y: logoY,
        width: logoWidth,
        height: logoHeight,
      });
    }

    // título um pouco abaixo da faixa
    const titleY = ph - barHeight - 18;

    if (isFirst) {
      p.drawText(`Contrato de Prestação de Serviços – ${systemName}`, {
        x: leftMargin,
        y: titleY,
        size: 12,
        font: fontBold,
        color: primaryBlue,
      });
    } else {
      p.drawText(`Contrato de Prestação de Serviços – ${systemName} (cont.)`, {
        x: leftMargin,
        y: titleY,
        size: 11,
        font: fontBold,
        color: primaryBlue,
      });

      p.drawText(`Página ${pageNumber}`, {
        x: pw - rightMargin - 60,
        y: titleY,
        size: 9,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });
    }
  };

  const drawFooter = (p: typeof page) => {
    const { width: pw } = p.getSize();

    // base do rodapé ~70px acima da borda inferior
    const baseY = 70;

    // linha de separação
    p.drawLine({
      start: { x: leftMargin, y: baseY + 30 },
      end: { x: pw - rightMargin, y: baseY + 30 },
      thickness: 0.6,
      color: primaryBlue,
    });

    const footerFontSize = 8;

    p.drawText("NetXpert Sistemas • www.netxpert.com.br", {
      x: leftMargin,
      y: baseY + 18,
      size: footerFontSize,
      font,
      color: primaryBlue,
    });

    p.drawText("E-mail: contato@netxpert.com.br • WhatsApp: (31) 9 8437-2245", {
      x: leftMargin,
      y: baseY + 8,
      size: footerFontSize,
      font,
      color: primaryBlue,
    });

    p.drawText(
      "Endereço: R. Canaã, 365 – Grajaú – Belo Horizonte/MG – CEP 30431-101",
      {
        x: leftMargin,
        y: baseY - 2,
        size: footerFontSize,
        font,
        color: primaryBlue,
      }
    );
  };

  const drawWatermark = (p: typeof page) => {
    if (!logoImage) return;

    const { width: pw, height: ph } = p.getSize();

    // watermark ocupa no máximo 55% da largura da página
    const maxW = pw * 0.55;
    const maxH = ph * 0.35;

    const scale = Math.min(maxW / logoImage.width, maxH / logoImage.height);

    const wmWidth = logoImage.width * scale;
    const wmHeight = logoImage.height * scale;

    const x = pw / 2 - wmWidth / 2;
    const y = ph / 2 - wmHeight / 2;

    p.drawImage(logoImage, {
      x,
      y,
      width: wmWidth,
      height: wmHeight,
      opacity: 0.04,
    });
  };

  // === desenha header/footer/watermark na primeira página ===
  drawHeader(page, true);
  drawFooter(page);
  drawWatermark(page);

  // === QUADRO RESUMO NA PRIMEIRA PÁGINA ===

  cursorY = height - topMargin;

  page.drawText("Quadro resumo do contrato", {
    x: leftMargin,
    y: cursorY,
    size: 11,
    font: fontBold,
    color: primaryBlue,
  });

  cursorY -= 18;

  const resumoLines: { label: string; value: string }[] = [
    { label: "Cliente", value: clientName },
    { label: "CPF / CNPJ", value: clientDocument },
    { label: "E-mail", value: clientEmail },
    { label: "Endereço", value: clientAddress },
    { label: "Telefone", value: clientPhone },
    { label: "Sistema contratado", value: `${systemName} — ${planName}` },
    { label: "Valor mensal", value: planValue },
    { label: "Início da vigência", value: startDate },
  ];

  for (const item of resumoLines) {
    page.drawText(item.label + ":", {
      x: leftMargin,
      y: cursorY,
      size: 9,
      font: fontBold,
      color: rgb(0.15, 0.15, 0.15),
    });

    page.drawText(item.value, {
      x: leftMargin + 110,
      y: cursorY,
      size: 9,
      font,
      color: rgb(0, 0, 0),
    });

    cursorY -= 16;
  }

  cursorY -= 12;

  page.drawLine({
    start: { x: leftMargin, y: cursorY },
    end: { x: width - rightMargin, y: cursorY },
    thickness: 0.6,
    color: rgb(0.7, 0.7, 0.7),
  });

  cursorY -= 22;

  page.drawText("Cláusulas contratuais", {
    x: leftMargin,
    y: cursorY,
    size: 11,
    font: fontBold,
    color: primaryBlue,
  });

  cursorY -= 18;

  // === FUNÇÃO AUXILIAR: NOVA PÁGINA (continuação) ===
  const newPage = () => {
    page = pdfDoc.addPage();
    pages.push(page);
    ({ width, height } = page.getSize());
    pageNumber += 1;
    cursorY = height - topMargin;

    drawHeader(page, false);
    drawFooter(page);
    drawWatermark(page);
  };

  // === CONTEÚDO DO CONTRATO (HTML -> TEXTO -> PARÁGRAFOS) ===
  const plainText = htmlToPlainText(content);
  const paragraphs = plainText.split(/\r?\n/);

  for (const paragraph of paragraphs) {
    const text = paragraph.trim();
    if (!text) {
      cursorY -= fontSize * 1.2;
      if (cursorY < bottomMargin) {
        newPage();
      }
      continue;
    }

    const words = text.split(" ");
    let line = "";

    const maxWidth = width - leftMargin - rightMargin;

    for (const word of words) {
      const testLine = line ? line + " " + word : word;
      const lineWidth = font.widthOfTextAtSize(testLine, fontSize);

      if (lineWidth > maxWidth) {
        page.drawText(line, {
          x: leftMargin,
          y: cursorY,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });

        cursorY -= fontSize * 1.4;
        line = word;

        if (cursorY < bottomMargin) {
          newPage();
        }
      } else {
        line = testLine;
      }
    }

    if (line) {
      page.drawText(line, {
        x: leftMargin,
        y: cursorY,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      cursorY -= fontSize * 1.4;

      if (cursorY < bottomMargin) {
        newPage();
      }
    }
  }

  // === RODAPÉ DA ASSINATURA NA ÚLTIMA PÁGINA ===
  const lastPage = pages[pages.length - 1];

  // posiciona o bloco de assinatura ACIMA da área de texto limite,
  // para não encostar no rodapé visual
  const footerY = bottomMargin + 15; // antes era bottomMargin - 25

  const footerText1 = `Assinado eletronicamente em ${signedAt.toLocaleString(
    "pt-BR",
    { timeZone: "America/Sao_Paulo" }
  )}.`;

  lastPage.drawText(footerText1, {
    x: leftMargin,
    y: footerY,
    size: 8,
    font,
    color: rgb(0, 0, 0),
  });

  if (signerIp) {
    const footerText2 = `IP do dispositivo no momento do aceite: ${signerIp}`;
    lastPage.drawText(footerText2, {
      x: leftMargin,
      y: footerY - 12,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
