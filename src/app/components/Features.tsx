//import { Card } from "./Card";

import { PiCubeFill, PiMoneyLight, PiTruckLight, PiWhatsappLogoLight } from "react-icons/pi";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

export function Features() {
    return (
        <div className="pt-16 max-w-[1200px] ">
            <div className="relative">
                <div className="w-full absolute z-20 top-0 right-0 h-[220px] bg-gradient-to-r from-[#07090D]/50 to-[#07090D]/50  via-transparent">
                </div>
            </div>

            <h3 className="text-white/70">Principais Recursos</h3>

            <Swiper
                spaceBetween={30}
                onSwiper={(swiper) => console.log(swiper)}
                className='z-[10] overflow-hidden w-full mt-6'
                modules={[Autoplay]}
                centeredSlides={true}
                slidesPerView={3}
                loop
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                initialSlide={2}
            >
                <SwiperSlide className='w-full ' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="flex flex-col max-w-[250px] items-center gap-4 py-8 px-4 text-[#D0D1D1]">
                        <PiCubeFill size={54} />
                        <h4 className="text-xl font-bold">Estoque em Tempo Real</h4>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='w-full ' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="flex flex-col max-w-[250px] items-center gap-4 py-8 px-4 text-[#D0D1D1]">
                        <PiWhatsappLogoLight size={54} />
                        <h4 className="text-xl font-bold">Pedidos pelo Whatsapp</h4>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='w-full ' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="flex flex-col max-w-[250px] items-center gap-4 py-8 px-4 text-[#D0D1D1]">
                        <PiTruckLight size={54} />
                        <h4 className="text-xl font-bold">Controle as suas Entregas</h4>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='w-full ' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="flex flex-col max-w-[250px] items-center gap-4 py-8 px-4 text-[#D0D1D1]">
                        <PiMoneyLight size={54} />
                        <h4 className="text-xl font-bold">Relatórios <br /> Financeiros</h4>
                    </div>
                </SwiperSlide>
            </Swiper>

            {/* <div className="mt-6 flex justify-between gap-10">
                <div className="flex flex-col max-w-[250px] items-center gap-4 py-8 px-4 text-[#D0D1D1]">
                    <PiCubeFill size={54} />
                    <h4 className="text-xl font-bold">Estoque em Tempo Real</h4>
                </div>

                <div className="flex flex-col max-w-[250px] items-center gap-4 py-8 px-4 text-[#D0D1D1]">
                    <PiWhatsappLogoLight size={54} />
                    <h4 className="text-xl font-bold">Pedidos pelo Whatsapp</h4>
                </div>

                <div className="flex flex-col max-w-[250px] items-center gap-4 py-8 px-4 text-[#D0D1D1]">
                    <PiTruckLight size={54} />
                    <h4 className="text-xl font-bold">Controle as suas Entregas</h4>
                </div>

                <div className="flex flex-col max-w-[250px] items-center gap-4 py-8 px-4 text-[#D0D1D1]">
                    <PiMoneyLight size={54} />
                    <h4 className="text-xl font-bold">Relatórios <br /> Financeiros</h4>
                </div>
            </div> */}

        </div>
    )
}