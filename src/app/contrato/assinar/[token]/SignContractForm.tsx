'use client'

import { useState } from 'react'

type Props = {
    token: string
    isSigned: boolean
}

export default function SignContractForm({ token, isSigned }: Props) {
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(isSigned)
    const [error, setError] = useState<string | null>(null)

    async function handleSign() {
        if (!checked || done) return

        setLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/contracts/sign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            })

            const json = await res.json()

            if (!res.ok) {
                setError(json?.error || 'Erro ao registrar assinatura.')
            } else {
                setDone(true)
            }
        } catch (err) {
            console.error(err)
            setError('Erro inesperado. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 text-sm text-zinc-200">
            <h3 className="text-sm font-semibold text-zinc-50">
                Confirmação de aceite
            </h3>

            <p className="mt-2 text-xs text-zinc-400">
                Ao confirmar abaixo, você declara que leu e concorda com todos os termos do contrato
                apresentado, autorizando a Netxpert a prestar os serviços conforme descrito.
            </p>

            {error && (
                <div className="mt-3 rounded-lg border border-red-700 bg-red-950/60 px-3 py-2 text-xs text-red-200">
                    {error}
                </div>
            )}

            {done ? (
                <div className="mt-4 rounded-lg border border-emerald-700 bg-emerald-950/60 px-3 py-3 text-xs text-emerald-100">
                    <p className="font-medium">Contrato assinado com sucesso.</p>
                    <p className="mt-1">
                        Sua assinatura foi registrada no sistema. Caso precise do documento, solicite à equipe
                        da Netxpert.
                    </p>
                </div>
            ) : (
                <>
                    <label className="mt-4 flex items-start gap-2 text-xs text-zinc-200">
                        <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                        <span>
                            Li e concordo com todos os termos do contrato acima, e autorizo o início da
                            prestação de serviços pela Netxpert.
                        </span>
                    </label>

                    <button
                        type="button"
                        onClick={handleSign}
                        disabled={!checked || loading}
                        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow-md shadow-amber-500/30 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? 'Registrando aceite...' : 'Confirmar aceite do contrato'}
                    </button>
                </>
            )}
        </div>
    )
}
