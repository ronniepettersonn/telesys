// src/app/contratos/page.tsx
'use client'

import { useEffect, useState } from 'react'

type ContractStatus = 'PENDING' | 'SIGNED' | 'EXPIRED' | 'CANCELED'

type ContractItem = {
    id: string
    clientName: string
    clientDocument: string
    clientEmail: string
    systemName: string
    planName: string
    status: ContractStatus
    startDate: string
    createdAt: string
    signedAt: string | null
    pdfUrl: string | null
    token: string
}

type ApiResponse = {
    items: ContractItem[]
    total: number
    page: number
    perPage: number
    totalPages: number
}

const PER_PAGE = 10

export default function ContractsListPage() {
    const [contracts, setContracts] = useState<ContractItem[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)
    const [q, setQ] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function fetchContracts(opts?: { page?: number; q?: string }) {
        try {
            setLoading(true)
            setError(null)

            const currentPage = opts?.page ?? page
            const currentQ = opts?.q ?? q

            const params = new URLSearchParams()
            params.set('page', String(currentPage))
            params.set('perPage', String(PER_PAGE))
            if (currentQ.trim()) {
                params.set('q', currentQ.trim())
            }

            const res = await fetch(`/api/contracts?${params.toString()}`, {
                method: 'GET',
            })

            if (!res.ok) {
                throw new Error('Erro ao carregar contratos.')
            }

            const json: ApiResponse = await res.json()

            setContracts(json.items)
            setPage(json.page)
            setTotalPages(json.totalPages)
            setTotal(json.total)
        } catch (err) {
            console.error(err)
            setError('Não foi possível carregar os contratos. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContracts({ page: 1 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setQ(searchInput)
        setPage(1)
        fetchContracts({ page: 1, q: searchInput })
    }

    function handleClearSearch() {
        setSearchInput('')
        setQ('')
        setPage(1)
        fetchContracts({ page: 1, q: '' })
    }

    function handlePageChange(newPage: number) {
        if (newPage < 1 || newPage > totalPages) return
        setPage(newPage)
        fetchContracts({ page: newPage })
    }

    const formatDate = (value: string | null) => {
        if (!value) return '—'
        const date = new Date(value)
        return date.toLocaleDateString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
        })
    }

    const statusLabel: Record<ContractStatus, string> = {
        PENDING: 'Pendente',
        SIGNED: 'Assinado',
        EXPIRED: 'Expirado',
        CANCELED: 'Cancelado',
    }

    const statusColorClass: Record<ContractStatus, string> = {
        PENDING:
            'bg-amber-500/10 text-amber-300 border border-amber-500/40',
        SIGNED:
            'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40',
        EXPIRED:
            'bg-red-500/10 text-red-300 border border-red-500/40',
        CANCELED:
            'bg-zinc-600/20 text-zinc-200 border border-zinc-500/40',
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* Topo */}
            <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                            Administração
                        </p>
                        <h1 className="text-lg font-semibold text-zinc-50 sm:text-xl">
                            Contratos gerados
                        </h1>
                        <p className="mt-1 text-sm text-zinc-400">
                            Consulte todos os contratos emitidos, filtre por cliente e acesse
                            o link de assinatura ou o PDF assinado.
                        </p>
                    </div>
                </div>
            </header>

            {/* Conteúdo */}
            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-lg shadow-black/40 sm:p-6">
                    {/* Filtro / Busca */}
                    <form
                        onSubmit={handleSearchSubmit}
                        className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-zinc-400">
                                Buscar por nome ou CPF/CNPJ
                            </label>
                            <div className="mt-1 flex gap-2">
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Ex.: AVIP GAS ou 00.000.000/0001-00"
                                    className="block w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-md shadow-amber-500/30 transition hover:bg-amber-400"
                                >
                                    Buscar
                                </button>
                            </div>
                            {q && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="mt-1 text-xs text-zinc-400 hover:text-zinc-200"
                                >
                                    Limpar filtro ({q})
                                </button>
                            )}
                        </div>

                        <div className="text-right text-xs text-zinc-400">
                            <p>
                                Total de contratos:{' '}
                                <span className="font-semibold text-zinc-100">
                                    {total}
                                </span>
                            </p>
                            <p>
                                Página {page} de {totalPages}
                            </p>
                        </div>
                    </form>

                    {/* Feedback de erro */}
                    {error && (
                        <div className="mb-4 rounded-lg border border-red-700 bg-red-950/60 px-3 py-2 text-sm text-red-200">
                            {error}
                        </div>
                    )}

                    {/* Tabela */}
                    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/40">
                        <table className="min-w-full divide-y divide-zinc-800 text-sm">
                            <thead className="bg-zinc-900/80">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                        Cliente
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                        Documento
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                        Sistema / Plano
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                        Criado em
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                        Vigência
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                        Assinado em
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {loading && contracts.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-4 py-6 text-center text-sm text-zinc-400"
                                        >
                                            Carregando contratos...
                                        </td>
                                    </tr>
                                )}

                                {!loading && contracts.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-4 py-6 text-center text-sm text-zinc-400"
                                        >
                                            Nenhum contrato encontrado.
                                        </td>
                                    </tr>
                                )}

                                {contracts.map((c) => (
                                    <tr key={c.id} className="hover:bg-zinc-900/60">
                                        <td className="px-4 py-3 align-top">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-zinc-100">
                                                    {c.clientName}
                                                </span>
                                                <span className="text-xs text-zinc-400">
                                                    {c.clientEmail}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="font-mono text-xs text-zinc-200">
                                                {c.clientDocument}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <div className="flex flex-col">
                                                <span className="text-zinc-100">
                                                    {c.systemName}
                                                </span>
                                                <span className="text-xs text-zinc-400">
                                                    {c.planName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusColorClass[c.status]}`}
                                            >
                                                {statusLabel[c.status]}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top text-xs text-zinc-200">
                                            {formatDate(c.createdAt)}
                                        </td>
                                        <td className="px-4 py-3 align-top text-xs text-zinc-200">
                                            {formatDate(c.startDate)}
                                        </td>
                                        <td className="px-4 py-3 align-top text-xs text-zinc-200">
                                            {formatDate(c.signedAt)}
                                        </td>
                                        <td className="px-4 py-3 align-top text-right text-xs">
                                            <div className="flex flex-col items-end gap-1">
                                                <a
                                                    href={`/contrato/assinar/${c.token}`}
                                                    target="_blank"
                                                    className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-[11px] font-medium text-zinc-100 hover:border-amber-400 hover:text-amber-300"
                                                >
                                                    Ver contrato
                                                </a>
                                                {c.pdfUrl && (
                                                    <a
                                                        href={c.pdfUrl}
                                                        target="_blank"
                                                        className="inline-flex items-center rounded-md border border-emerald-700 bg-emerald-950/40 px-2 py-1 text-[11px] font-medium text-emerald-200 hover:border-emerald-400"
                                                    >
                                                        PDF assinado
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginação */}
                    <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p className="text-xs text-zinc-500">
                            Mostrando{' '}
                            <span className="font-semibold text-zinc-100">
                                {contracts.length}
                            </span>{' '}
                            de{' '}
                            <span className="font-semibold text-zinc-100">
                                {total}
                            </span>{' '}
                            contratos
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page <= 1 || loading}
                                className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 hover:border-amber-400"
                            >
                                Anterior
                            </button>
                            <span className="text-xs text-zinc-400">
                                Página{' '}
                                <span className="font-semibold text-zinc-100">
                                    {page}
                                </span>{' '}
                                de{' '}
                                <span className="font-semibold text-zinc-100">
                                    {totalPages}
                                </span>
                            </span>
                            <button
                                type="button"
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page >= totalPages || loading}
                                className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 hover:border-amber-400"
                            >
                                Próxima
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
