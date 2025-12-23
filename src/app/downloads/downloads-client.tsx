// app/downloads/downloads-client.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

type DownloadItem = {
    id: string
    title: string
    description: string
    fileName: string
    href: string
    version?: string
    updatedAt?: string
    steps: { title: string; text: string, img: string }[]
    notes?: string[]
}

const ITEMS: DownloadItem[] = [
    {
        id: "acesso-remoto",
        title: "Acesso Remoto",
        description: "Arquivo oficial para acesso remoto do suporte.",
        fileName: "rustdesk-1.4.4-x86-sciter.exe",
        href: "https://github.com/rustdesk/rustdesk/releases/download/1.4.4/rustdesk-1.4.4-x86-sciter.exe",
        version: "v1.4.4",
        updatedAt: "23/12/2025",
        steps: [
            {
                title: "Baixe o arquivo",
                text: "Clique em “Baixar agora” e salve o .zip no seu computador.",
                img: ''
            },
            {
                title: "Execute o arquivo baixado",
                text: "Clique duas vezes no arquivo baixado para abrir o programa.",
                img: ''
            },
            {
                title: "Configura o programa",
                text: "Clique no icone de menu que fica na parte superior da janela, como na imagem abaixo.",
                img: '/stepsImage/step3.png'
            },
            {
                title: "Configure as credenciais",
                text: "No menu lateral clique em Rede/Network e depois clique em ServidorID/Relay",
                img: '/stepsImage/step4.png'
            },
            {
                title: "Finalize a configuração",
                text: "Na tela que abriu insira no campo KEY a chave informada pela nossa equipe de suporte e depois clique no icone da prancheta para preencher as informações. Depois é só clicar em OK para finalizar a configuração.",
                img: '/stepsImage/step5.png'
            },
            {
                title: "Pegue o ID e senha do acesso",
                text: "Clique na aba INICIO e passe o ID e a senha para nossa equipe do suporte para acessar seu computador.",
                img: '/stepsImage/step6.png'
            },
        ],
        notes: [
            "Se tiver alguma dificuldade no processo, chame nosso suporte clicando em ACESSAR SUPORTE.",
            "Se o Windows bloquear, clique em “Mais informações” → “Executar assim mesmo”.",
        ],
    },

    // Exemplo de segundo item (deixa pronto pra você adicionar mais):
    /* {
        id: "driver",
        title: "Driver / Complemento (exemplo)",
        description: "Baixe um complemento opcional (ajuste para o seu caso).",
        fileName: "telesys-driver.exe",
        href: "/downloads/telesys-driver.exe",
        version: "v1.0.0",
        updatedAt: "23/12/2025",
        steps: [
            {
                title: "Baixe o instalador",
                text: "Clique em “Baixar agora” e salve o instalador no seu computador.",
            },
            {
                title: "Execute como administrador",
                text: "Clique com o botão direito no arquivo e escolha “Executar como administrador”.",
            },
            {
                title: "Siga o assistente",
                text: "Clique em Avançar até concluir. Reinicie o computador se for solicitado.",
            },
        ],
    }, */
]

export default function DownloadsClient() {
    const [selectedId, setSelectedId] = useState<string | null>('acesso-remoto')

    const selected = useMemo(
        () => ITEMS.find((i) => i.id === selectedId) ?? null,
        [selectedId],
    )

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* MENU */}
            <aside className="rounded-2xl border border-white/10 bg-[#0F172A] p-4 shadow-xl lg:col-span-1 h-fit">
                <div className="px-2 pb-2">
                    <h2 className="text-lg font-bold">Downloads</h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Selecione um item para ver o download e o tutorial.
                    </p>
                </div>

                <div className="mt-3 space-y-2">
                    {ITEMS.map((item) => {
                        const active = item.id === selectedId
                        return (
                            <button
                                key={item.id}
                                onClick={() => setSelectedId(item.id)}
                                className={[
                                    "w-full text-left rounded-xl border p-4 transition",
                                    active
                                        ? "border-sky-500/40 bg-sky-500/10"
                                        : "border-white/10 bg-black/20 hover:bg-white/5",
                                ].join(" ")}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="font-semibold text-slate-100">
                                            {item.title}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-400">
                                            {item.description}
                                        </div>
                                    </div>

                                    <span
                                        className={[
                                            "shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                                            active
                                                ? "bg-sky-500/20 text-sky-300"
                                                : "bg-white/5 text-slate-300",
                                        ].join(" ")}
                                    >
                                        {active ? "Selecionado" : "Ver"}
                                    </span>
                                </div>
                            </button>
                        )
                    })}
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-semibold">Suporte</div>
                    <div className="mt-1 text-xs text-slate-400">
                        Se tiver dúvida na instalação, fale com a equipe.
                    </div>
                    <Link
                        href="https://wa.me/5531984372245"
                        target="_blank"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                    >
                        Acessar suporte
                    </Link>
                </div>
            </aside>

            {/* DETALHE / TUTORIAL */}
            <section className="rounded-2xl border border-white/10 bg-[#0F172A] p-6 shadow-xl lg:col-span-2">
                {!selected ? (
                    <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
                        <div className="text-xl font-bold">Selecione um item no menu</div>
                        <p className="mt-2 max-w-md text-sm text-slate-400">
                            Quando você escolher um download, vamos exibir o botão para baixar
                            e o tutorial específico.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                                <h2 className="text-xl font-extrabold">{selected.title}</h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    {selected.description}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
                                    <span>
                                        <strong className="text-slate-200">Arquivo:</strong>{" "}
                                        {selected.fileName}
                                    </span>
                                    {selected.version && (
                                        <span>
                                            <strong className="text-slate-200">Versão:</strong>{" "}
                                            {selected.version}
                                        </span>
                                    )}
                                    {selected.updatedAt && (
                                        <span>
                                            <strong className="text-slate-200">Atualizado:</strong>{" "}
                                            {selected.updatedAt}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <a
                                href={selected.href}
                                download
                                className="inline-flex items-center justify-center rounded-xl min-w-[140px] bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
                            >
                                Baixar agora
                            </a>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold">Tutorial de configuração</h3>
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                                    Passo a passo
                                </span>
                            </div>

                            <ol className="mt-4 space-y-4">
                                {selected.steps.map((step, idx) => (
                                    <li
                                        key={step.title}
                                        className="flex gap-4 rounded-xl border border-white/10 bg-black/20 p-4"
                                    >
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500 text-sm font-bold text-white">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <div className="font-semibold">{step.title}</div>
                                            <div className="mt-1 text-sm text-slate-400">
                                                {step.text}
                                            </div>
                                            {
                                                step.img &&
                                                <div className="mt-4 ">
                                                    <Image src={step.img} alt={step.title} width={500} height={500} className="rounded-2xl" />
                                                </div>
                                            }
                                        </div>
                                    </li>
                                ))}
                            </ol>

                            {selected.notes?.length ? (
                                <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
                                    <h4 className="font-bold text-amber-300">
                                        Observações importantes
                                    </h4>
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-200/90">
                                        {selected.notes.map((n) => (
                                            <li key={n}>{n}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}
