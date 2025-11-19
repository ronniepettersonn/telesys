import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import SignContractForm from './SignContractForm'

/* type SignContractPageProps = {
    params: {
        token: string
    }
} */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SignContractPage({ params }: any) {
    const { token } = await params

    const instance = await prisma.contractInstance.findUnique({
        where: { token },
    })

    if (!instance) {
        return notFound()
    }

    const isSigned = instance.status === 'SIGNED'

    const formattedDate = instance.startDate.toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
    })

    const formattedPlanValue =
        instance.planValue &&
        instance.planValue
            .toNumber()
            .toLocaleString('pt-BR', { minimumFractionDigits: 2 })

    // Agora usamos o snapshot salvo na instância
    const renderedContent = instance.content

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* Topo */}
            <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                            Contrato de prestação de serviços
                        </p>
                        <h1 className="text-lg font-semibold text-zinc-50 sm:text-xl">
                            {instance.systemName} • Netxpert
                        </h1>
                        <p className="mt-1 text-sm text-zinc-400">
                            Revise os termos abaixo e confirme o aceite para ativar o seu contrato.
                        </p>
                    </div>
                </div>
            </header>

            {/* Conteúdo */}
            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
                    {/* CONTRATO */}
                    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/40 sm:p-8">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-zinc-50">
                                    Termos do contrato
                                </h2>
                                <p className="mt-1 text-xs text-zinc-400">
                                    Leia com atenção antes de confirmar o aceite.
                                </p>
                            </div>

                            <div className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
                                {isSigned ? (
                                    <span className="text-emerald-300">
                                        ● Contrato já assinado
                                    </span>
                                ) : (
                                    <span className="text-amber-300">
                                        ● Aguardando assinatura
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Texto do contrato */}
                        <div className="mt-4 max-h-[60vh] space-y-4 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-4 text-sm leading-relaxed text-zinc-200">
                            {/* <pre className="whitespace-pre-wrap text-sm text-zinc-200">
                                {renderedContent}
                            </pre> */}

                            <div
                                className="prose prose-invert max-w-none text-sm"
                                dangerouslySetInnerHTML={{ __html: renderedContent }}
                            />
                        </div>
                    </section>

                    {/* RESUMO + AÇÃO */}
                    <aside className="space-y-4">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 text-sm text-zinc-200">
                            <h3 className="text-sm font-semibold text-zinc-50">
                                Dados do contratante
                            </h3>
                            <dl className="mt-3 space-y-2 text-xs text-zinc-300">
                                <div>
                                    <dt className="text-zinc-500">Cliente</dt>
                                    <dd className="font-medium text-zinc-100">
                                        {instance.clientName}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-zinc-500">CPF / CNPJ</dt>
                                    <dd className="font-mono text-[11px] text-zinc-200">
                                        {instance.clientDocument}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-zinc-500">E-mail</dt>
                                    <dd className="text-zinc-200">
                                        {instance.clientEmail}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-zinc-500">Endereço</dt>
                                    <dd className="text-zinc-200">
                                        {instance.clientAddress}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-zinc-500">Telefone</dt>
                                    <dd className="text-zinc-200">
                                        {instance.clientPhone}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-zinc-500">Sistema contratado</dt>
                                    <dd className="text-zinc-200">
                                        {instance.systemName} — {instance.planName}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-zinc-500">Valor mensal</dt>
                                    <dd className="text-zinc-200">
                                        {formattedPlanValue ? `R$ ${formattedPlanValue}` : '—'}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-zinc-500">Início de vigência</dt>
                                    <dd className="text-zinc-200">
                                        {formattedDate}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <SignContractForm token={token} isSigned={isSigned} />
                    </aside>
                </div>
            </main>
        </div>
    )
}
