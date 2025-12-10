'use client'

import { Header } from '@/components/Header'
import { useState } from 'react'

type TemplateOption = {
    slug: string
    name: string
    version: string
}

type FormState = {
    templateSlug: string
    clientName: string
    clientEmail: string
    clientDocument: string
    clientAddress: string
    clientPhone: string
    systemName: string
    planName: string
    planValue: string
    startDate: string
}

type Props = {
    templates: TemplateOption[]
}

export default function NovoContratoForm({ templates }: Props) {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setResult(null)
        setError(null)

        const form = e.currentTarget
        const data = Object.fromEntries(new FormData(form)) as unknown as FormState

        try {
            const res = await fetch('/api/contracts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const json = await res.json()

            if (!res.ok) {
                setError(json?.error || 'Erro ao gerar contrato.')
            } else {
                setResult(json.signUrl)
                form.reset()
            }
        } catch (err) {
            console.error(err)
            setError('Erro inesperado. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    const hasTemplates = templates.length > 0

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* Topo / header interno */}
            <Header
                tagline='Administração'
                title='Novo contrato de prestação de serviço'
                description='Gere o link de assinatura do contrato para o cliente de forma rápida e padronizada.'
            />

            {/* Conteúdo */}
            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
                    {/* CARD PRINCIPAL */}
                    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/40 sm:p-8">
                        <h2 className="text-base font-semibold text-zinc-50">
                            Dados do contrato
                        </h2>
                        <p className="mt-1 text-sm text-zinc-400">
                            Preencha os dados abaixo. O sistema vai gerar uma instância do contrato com base
                            no template selecionado e criar o link de assinatura para o cliente.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {/* Template */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-200">
                                        Template do contrato
                                    </label>
                                    <p className="mt-1 text-xs text-zinc-500">
                                        Selecione o modelo de contrato já cadastrado no sistema.
                                    </p>

                                    <select
                                        name="templateSlug"
                                        required
                                        disabled={!hasTemplates}
                                        className="mt-2 block w-full rounded-lg border border-zinc-700 bg-zinc-900 h-[38px] px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            {hasTemplates
                                                ? 'Selecione um template'
                                                : 'Nenhum template cadastrado'}
                                        </option>

                                        {templates.map((tpl) => (
                                            <option key={tpl.slug} value={tpl.slug}>
                                                {tpl.name} {tpl.version ? `• v${tpl.version}` : ''}
                                            </option>
                                        ))}
                                    </select>

                                    {!hasTemplates && (
                                        <p className="mt-2 text-xs text-red-300">
                                            Nenhum template encontrado. Cadastre pelo menos um registro em
                                            <span className="font-mono"> ContractTemplate </span> no banco.
                                        </p>
                                    )}
                                </div>

                                {/* Nome cliente */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-200">
                                        Nome / Razão social
                                    </label>
                                    <input
                                        name="clientName"
                                        required
                                        placeholder="Ex.: Distribuidora de Gás Minas Ltda"
                                        className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                                    />
                                </div>

                                {/* Documento */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-200">
                                        CPF / CNPJ
                                    </label>
                                    <input
                                        name="clientDocument"
                                        required
                                        placeholder="00.000.000/0001-00"
                                        className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                                    />
                                </div>

                                {/* Endereço */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-200">
                                        Endereço completo
                                    </label>
                                    <input
                                        name="clientAddress"
                                        required
                                        placeholder="Rua, número, bairro, cidade/UF, CEP"
                                        className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                                    />
                                </div>

                                {/* Telefone */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-200">
                                        Telefone / WhatsApp
                                    </label>
                                    <input
                                        name="clientPhone"
                                        required
                                        placeholder="(31) 99999-9999"
                                        className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                                    />
                                </div>

                                {/* E-mail */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-200">
                                        E-mail do responsável
                                    </label>
                                    <input
                                        name="clientEmail"
                                        type="email"
                                        required
                                        placeholder="contato@cliente.com.br"
                                        className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                                    />
                                </div>

                                {/* Sistema */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-200">
                                        Sistema contratado
                                    </label>
                                    <input
                                        name="systemName"
                                        required
                                        placeholder="Telesys / IAttend / Netfiscal..."
                                        className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                                    />
                                </div>

                                {/* Plano */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-200">
                                        Plano / Modalidade
                                    </label>
                                    <input
                                        name="planName"
                                        required
                                        placeholder="Ex.: Plano Mensal, Plano Pro..."
                                        className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                                    />
                                </div>

                                {/* Valor mensal */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-200">
                                        Valor mensal (R$)
                                    </label>
                                    <input
                                        name="planValue"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        required
                                        placeholder="Ex.: 199.90"
                                        className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                                    />
                                </div>

                                {/* Data início */}
                                <div>
                                    <label className="block text-sm font-medium text-zinc-200">
                                        Início da vigência
                                    </label>
                                    <input
                                        name="startDate"
                                        type="date"
                                        required
                                        className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                                    />
                                </div>
                            </div>

                            {/* Feedback de erro */}
                            {error && (
                                <div className="rounded-lg border border-red-700 bg-red-950/60 px-3 py-2 text-sm text-red-200">
                                    {error}
                                </div>
                            )}

                            {/* Resultado */}
                            {result && (
                                <div className="rounded-lg border border-emerald-700 bg-emerald-950/60 px-3 py-3 text-sm text-emerald-100">
                                    <p className="font-medium">Contrato gerado com sucesso!</p>
                                    <p className="mt-1">
                                        O link para assinatura do contrato foi enviado por e-mail para o cliente, se precisar
                                        do link ele está logo abaixo:
                                    </p>
                                    <a
                                        href={result}
                                        target="_blank"
                                        className="mt-2 break-all font-mono text-xs text-emerald-200"
                                    >
                                        {result}
                                    </a>
                                </div>
                            )}

                            <div className="flex flex-col gap-3 pt-2 ">
                                <p className="text-xs text-zinc-500">
                                    Ao gerar o contrato, o cliente receberá o link de assinatura pelo canal que
                                    você enviar este endereço.
                                </p>

                                <button
                                    type="submit"
                                    disabled={loading || !hasTemplates}
                                    className="inline-flex items-center justify-center rounded-lg hover:cursor-pointer bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-md shadow-amber-500/30 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {loading ? 'Gerando contrato...' : 'Gerar contrato'}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Lateral / ajuda */}
                    <aside className="space-y-4">
                        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">
                            <h3 className="text-sm font-semibold text-amber-200">
                                Como usar
                            </h3>
                            <p className="mt-1">
                                1. Cadastre os templates de contrato na tabela
                                <span className="font-mono text-xs"> ContractTemplate </span>.
                            </p>
                            <p className="mt-1">
                                2. Selecione o template desejado e preencha os dados do cliente.
                            </p>
                            <p className="mt-1">
                                3. Gere o contrato e envie o link de assinatura.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300">
                            <h3 className="text-sm font-semibold text-zinc-100">
                                Dica de organização
                            </h3>
                            <p className="mt-1">
                                Use um padrão para os slugs dos templates, como:
                            </p>
                            <ul className="mt-2 list-disc pl-4 text-xs text-zinc-400">
                                <li><span className="font-mono">netxpert-iattend</span></li>
                                <li><span className="font-mono">netxpert-netfiscal</span></li>
                                <li><span className="font-mono">netxpert-telesys</span></li>
                            </ul>
                            <p className="mt-2 text-xs text-zinc-500">
                                Dessa forma, fica fácil identificar qual contrato pertence a qual sistema.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    )
}
