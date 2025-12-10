import { ReactNode } from "react";

type HeaderProps = {
    button?: ReactNode
    title?: string
    description?: string
    tagline?: string
    wide?: boolean
}

export function Header({ button, title, description, tagline, wide = false }: HeaderProps) {

    return (
        <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur ">
            <div className={`mx-auto flex ${wide ? 'max-w-6xl' : 'max-w-5xl'} items-center justify-between px-4 py-4 sm:px-6 lg:px-8`}>
                <div className="flex items-center gap-4">
                    {/* <div>
                        <Image src={'/pdf/netxpert-logo.png'} alt="" height={120} width={120} className="max-w-[100px]" />
                    </div> */}
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                            {tagline}
                        </p>
                        <h1 className="text-lg font-semibold text-zinc-50 sm:text-xl">

                            {title}
                        </h1>
                        <p className="mt-1 text-sm text-zinc-400">
                            {description}
                        </p>
                    </div>
                </div>
                <div>
                    {button}
                </div>
            </div>
        </header>
    )
}