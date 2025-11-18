import { supabaseAdmin } from './supabase'

const bucket = process.env.SUPABASE_BUCKET_CONTRACTS || 'contracts'

export async function uploadContractPdf(
  contractInstanceId: string,
  pdfBytes: Uint8Array
): Promise<string> {
  const filePath = `contracts/${contractInstanceId}.pdf`

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, Buffer.from(pdfBytes), {
      contentType: 'application/pdf',
      upsert: true,
    })

  if (error) {
    console.error('Erro ao fazer upload do PDF no Supabase:', error)
    throw new Error('Erro ao salvar PDF no storage')
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath)

  if (!data?.publicUrl) {
    throw new Error('Não foi possível obter URL pública do PDF')
  }

  return data.publicUrl
}
