import Image from "next/image";
import imgBanner from '../../../public/imgBanner.webp'
import { useState } from "react";

export function Banner() {
    const [isShow, setIsShow] = useState(true)

    function onclose() {
        setIsShow(false)
    }

    return (
        <>
            {
                isShow &&
                <div className="relative">
                    <div className="fixed bottom-10 left-10 z-10">
                        <div aria-label="desktop-banner" className="relative z-30 hidden w-full min-w-[644px] overflow-hidden rounded-lg border border-gray-600/50 bg-[#060d0d] shadow-md shadow-emerald-400/20 lg:flex" style={{ opacity: 1, transform: 'translateY(0%) translateZ(0px)' }}>
                            <a aria-label="Accesar oferta exclusiva" className="flex items-center" href="https://rocketseat.trb.ai/wa/1FKUgT4" rel="noopener noreferrer" target="_blank">
                                <div className="">
                                    <Image alt="Formação de PHP na Rocketseat" width="194" height="194" className="h-full" style={{ color: "transparent" }} src={imgBanner} />
                                </div>
                                <div className="relative flex flex-col justify-center p-6"><div className="space-y-2" style={{ transform: "translateY(-8px) translateZ(0px)" }}>
                                    <h3 className="max-w-[402px] text-xl font-medium text-white">Já usa o módulo de Rastreio? Não perca tempo contrate já!</h3>
                                    <p className="max-w-[480px] pr-10 text-sm"> Converse com nossos especialistas e descubra como otimizar suas entregas enviando-as para o celular do entregador! </p>
                                </div>
                                    <p className="absolute bottom-0 flex items-center gap-2 text-xs font-bold uppercase text-emerald-400" style={{ opacity: 1 }}>
                                        Contratar Rastreio GPS
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    </p>
                                </div>
                            </a>
                            <button aria-label="fechar" onClick={onclose} className="absolute right-2 top-2 rounded-[5px] p-3 transition-colors hover:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
                                    <path d="M18 6 6 18"></path><path d="m6 6 12 12">
                                    </path>
                                </svg>
                            </button>
                        </div>

                        <div aria-label="desktop-banner" className="relative w-full max-w-[350px] rounded-[4px] border border-gray-600/50 bg-[#060d0d] p-2 pr-8 shadow-md shadow-emerald-400/20 lg:hidden" style={{ opacity: 1, transform: "translateY(0%), translateZ(0px)" }}>
                            <a aria-label="Accesar oferta exclusiva" className="flex items-center gap-2" href="https://rocketseat.trb.ai/wa/1FKUgT4" rel="noopener noreferrer" target="_blank">
                                <div className="h-full overflow-hidden rounded-[5px]">
                                    <Image alt="Mês do programador na Rocketseat" className="h-[48px] w-[48px]" style={{ color: "transparent" }} src={imgBanner} />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-white">Já usa o módulo de Rastreio? <br /> Contrate já!</h3>
                                    <p className="text-xs">Contratar Rastreio GPS</p>
                                </div>
                            </a>
                            <button aria-label="fechar" onClick={onclose} className="absolute right-1 top-1 rounded-[5px] p-1 transition-colors hover:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}