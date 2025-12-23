// app/downloads/page.tsx
import Link from "next/link"
import DownloadsClient from "./downloads-client"
import HeaderSecondary from "../components/HeaderSecondary"

export const metadata = {
    title: "Downloads | Telesys",
    description:
        "Baixe arquivos oficiais do Telesys e veja o tutorial específico de configuração.",
}

export default function DownloadsPage() {
    return (
        <>
            <header>
                <HeaderSecondary />
            </header>
            <main className="relative overflow-hidden min-h-screen bg-[#0A0F1F] text-slate-100">
                {/* HERO */}
                <section className="relative">
                    <div className="mx-auto max-w-6xl px-6 pt-30 pb-16 md:px-10">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-400">
                            Downloads oficiais - Telesys
                        </span>

                        <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
                            Escolha o que baixar e veja o passo a passo para configuração
                        </h1>

                        <p className="mt-4 max-w-2xl text-lg text-slate-400">
                            Selecione um item no menu para exibir o botão de download e o passo a
                            passo de configuração.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="https://wa.me/5531984372245"
                                target="_blank"
                                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition hover:bg-white/10"
                            >
                                Precisa de ajuda?
                            </Link>
                        </div>
                    </div>

                    {/* Glow */}
                    <div className="pointer-events-none absolute -top-32 right-[-120px] h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
                </section>

                {/* CONTENT */}
                <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
                    <DownloadsClient />
                </section>
            </main>
        </>
    )
}
