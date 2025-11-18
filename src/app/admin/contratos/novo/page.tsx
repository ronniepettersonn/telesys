import { prisma } from '@/lib/prisma'
import NovoContratoForm from './NovoContratoForm'

export default async function NovoContratoPage() {
    const templates = await prisma.contractTemplate.findMany({
        orderBy: { name: 'asc' },
    })

    // mapeia só o que o front precisa
    const templateOptions = templates.map((t) => ({
        slug: t.slug,
        name: t.name,
        version: t.version,
    }))

    return <NovoContratoForm templates={templateOptions} />
}
