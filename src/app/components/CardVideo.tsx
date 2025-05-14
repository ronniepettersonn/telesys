import Image from "next/image";
import { PiArrowRightBold } from "react-icons/pi";

import ImgVideo1 from '../../../public/imgVideo1.png'
import ImgVideo2 from '../../../public/imgVideo2.png'
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function CardVideo() {
    const [isOpenV1, setIsOpenV1] = useState(false)
    const [isOpenV2, setIsOpenV2] = useState(false)

    return (
        <>
            <div className="mt-20 flex flex-col min-[1250px]:flex-row items-center justify-center  gap-8">

                <div className="border border-[#4C5155] lg:max-w-[600px] w-full rounded-3xl">
                    <div className=" p-10">
                        <h3 className="text-3xl font-semibold">Conheça o Telesys</h3>

                        <p className="text-white/80 text-xl mt-4 mb-10">Assista esse video de apresentação do Telesys e tenha uma boa noção de
                            como o sistema funciona e como ele pode lhe ajudar</p>

                        <div className="flex justify-center">
                            <button onClick={() => setIsOpenV1(true)} className="hover:cursor-pointer py-2 bg-white w-fit rounded-full flex items-center gap-2 px-4 text-[16px] text-[#07090D]">
                                <p className="font-semibold">
                                    Assistir Apresentação do Telesys
                                </p>

                                <div className="h-5 w-5 rounded-full bg-[#07090D] text-white flex items-center justify-center">
                                    <PiArrowRightBold size={12} />
                                </div>
                            </button>
                        </div>

                    </div>

                    <div className="w-full overflow-hidden rounded-3xl">
                        <Image src={ImgVideo1} alt="" className="w-full" />
                    </div>
                </div>


                <div className="border border-[#4C5155] lg:max-w-[600px] w-full rounded-3xl">
                    <div className=" p-10">
                        <h3 className="text-3xl font-semibold">Rastreio GPS</h3>

                        <p className="text-white/80 text-xl mt-4 mb-10">Assista esse video de apresentação do módulo de Rastrio GPS
                            que permite acompanhar as entregas em tempo real no Telesys</p>

                        <div className="flex justify-center">
                            <button onClick={() => setIsOpenV2(true)} className="py-2 bg-white w-fit rounded-full flex items-center gap-2 px-4 text-[16px] text-[#07090D]">
                                <p className="font-semibold">
                                    Assistir Módulo Rastreio GPS
                                </p>

                                <div className="h-5 w-5 rounded-full bg-[#07090D] text-white flex items-center justify-center">
                                    <PiArrowRightBold size={12} />
                                </div>
                            </button>
                        </div>

                    </div>

                    <div className="w-full overflow-hidden rounded-3xl">
                        <Image src={ImgVideo2} alt="" className="w-full " />
                    </div>
                </div>


            </div>

            <div>
                <AnimatePresence>
                    {
                        isOpenV1 &&
                        <motion.div
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.3,
                                ease: 'easeInOut',
                            }}
                            onClick={() => setIsOpenV1(false)}
                            className="flex items-center justify-center fixed top-0 right-0 backdrop-blur-md bg-[#07090DCC] h-full w-full z-[9999999]"
                        >

                            <div className="p-2 bg-[#07090D] rounded-2xl border border-[#4C5155]">
                                <iframe className="rounded-2xl w-[360px] h-[215px] md:w-[560px] md:h-[315px]" /* width="560" height="315" */ src="https://www.youtube-nocookie.com/embed/yZ9blrqi9cw?si=I53XsSUsUwAcoMLT&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>

                <AnimatePresence>
                    {
                        isOpenV2 &&
                        <motion.div
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.3,
                                ease: 'easeInOut',
                            }}
                            onClick={() => setIsOpenV2(false)}
                            className="flex items-center justify-center fixed top-0 right-0 backdrop-blur-md bg-[#07090DCC] h-full w-full z-[9999999]"
                        >

                            <div className="p-2 bg-[#07090D] rounded-2xl border border-[#4C5155]">
                                <iframe className="rounded-2xl w-[360px] h-[215px] md:w-[560px] md:h-[315px]" /* width="560" height="315" */ src="https://www.youtube-nocookie.com/embed/ZjHLEW0XVrk?si=7GteKWrdC1BCxZH6&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>


            </div>
        </>
    )
}