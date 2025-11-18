import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

type CreateContractPdfParams = {
  content: string
  clientName: string
  clientEmail: string
  clientDocument: string
  systemName: string
  planName: string
  startDate: string // já formatada em pt-BR
  signedAt: Date
  signerIp?: string
}

export async function createContractPdf({
  content,
  clientName,
  clientEmail,
  clientDocument,
  systemName,
  planName,
  startDate,
  signedAt,
  signerIp,
}: CreateContractPdfParams): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const margin = 50
  const bottomMargin = 60
  const fontSize = 10

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pages: any[] = []

  let page = pdfDoc.addPage()
  pages.push(page)

  let { width, height } = page.getSize()
  let cursorY = height - margin
  let pageNumber = 1

  // === CABEÇALHO (primeira página) ===
  page.drawText('Netxpert Tecnologia', {
    x: margin,
    y: cursorY,
    size: 10,
    font: fontBold,
    color: rgb(0, 0, 0),
  })

  cursorY -= 18

  page.drawText(`Contrato de Prestação de Serviços - ${systemName}`, {
    x: margin,
    y: cursorY,
    size: 14,
    font: fontBold,
    color: rgb(0, 0, 0),
  })

  cursorY -= 26

  // === QUADRO RESUMO ===
  page.drawText('Quadro resumo do contrato', {
    x: margin,
    y: cursorY,
    size: 11,
    font: fontBold,
    color: rgb(0, 0, 0),
  })

  cursorY -= 18

  const resumoLines: { label: string; value: string }[] = [
    { label: 'Cliente', value: clientName },
    { label: 'CPF / CNPJ', value: clientDocument },
    { label: 'E-mail', value: clientEmail },
    { label: 'Sistema contratado', value: `${systemName} — ${planName}` },
    { label: 'Início da vigência', value: startDate },
  ]

  for (const item of resumoLines) {
    page.drawText(item.label + ':', {
      x: margin,
      y: cursorY,
      size: 9,
      font: fontBold,
      color: rgb(0.2, 0.2, 0.2),
    })

    page.drawText(item.value, {
      x: margin + 90,
      y: cursorY,
      size: 9,
      font,
      color: rgb(0, 0, 0),
    })

    cursorY -= 16
  }

  cursorY -= 10

  // linha separadora
  page.drawLine({
    start: { x: margin, y: cursorY },
    end: { x: width - margin, y: cursorY },
    thickness: 0.8,
    color: rgb(0.7, 0.7, 0.7),
  })

  cursorY -= 22

  page.drawText('Cláusulas contratuais', {
    x: margin,
    y: cursorY,
    size: 11,
    font: fontBold,
    color: rgb(0, 0, 0),
  })

  cursorY -= 18

  // === FUNÇÃO AUXILIAR: NOVA PÁGINA (continuação) ===
  const newPage = () => {
    page = pdfDoc.addPage()
    pages.push(page)
    ;({ width, height } = page.getSize())
    cursorY = height - margin
    pageNumber += 1

    // cabeçalho reduzido nas próximas páginas
    page.drawText(`Contrato de Prestação de Serviços - ${systemName} (cont.)`, {
      x: margin,
      y: cursorY,
      size: 11,
      font: fontBold,
      color: rgb(0, 0, 0),
    })

    page.drawText(`Página ${pageNumber}`, {
      x: width - margin - 70,
      y: cursorY,
      size: 9,
      font,
      color: rgb(0.3, 0.3, 0.3),
    })

    cursorY -= 22
  }

  // === QUEBRA DE LINHA E PAGINAÇÃO ===
  const paragraphs = content.split('\n')

  for (const paragraph of paragraphs) {
    const text = paragraph.trim()
    if (!text) {
      cursorY -= fontSize * 1.2
      if (cursorY < bottomMargin) {
        newPage()
      }
      continue
    }

    const words = text.split(' ')
    let line = ''

    for (const word of words) {
      const testLine = line ? line + ' ' + word : word
      const lineWidth = font.widthOfTextAtSize(testLine, fontSize)

      const maxWidth = width - margin * 2

      if (lineWidth > maxWidth) {
        page.drawText(line, {
          x: margin,
          y: cursorY,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        })

        cursorY -= fontSize * 1.4
        line = word

        if (cursorY < bottomMargin) {
          newPage()
        }
      } else {
        line = testLine
      }
    }

    if (line) {
      page.drawText(line, {
        x: margin,
        y: cursorY,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      })
      cursorY -= fontSize * 1.4

      if (cursorY < bottomMargin) {
        newPage()
      }
    }
  }

  // === RODAPÉ NA ÚLTIMA PÁGINA ===
  const lastPage = pages[pages.length - 1]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lastPageSize = lastPage.getSize()
  const footerY = bottomMargin - 20

  const footerText1 = `Assinado eletronicamente em ${signedAt.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })}.`

  lastPage.drawText(footerText1, {
    x: margin,
    y: footerY,
    size: 8,
    font,
    color: rgb(0, 0, 0),
  })

  if (signerIp) {
    const footerText2 = `IP do dispositivo no momento do aceite: ${signerIp}`
    lastPage.drawText(footerText2, {
      x: margin,
      y: footerY - 12,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    })
  }

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}
