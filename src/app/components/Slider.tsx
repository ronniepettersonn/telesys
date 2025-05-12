import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useState } from 'react';
import Image from 'next/image';
import Test1 from '../../../public/test1.png'
import Arrow from '../../../public/arrow.svg'
//import { PiDotOutlineFill } from 'react-icons/pi';

export function Slider() {
    //const swiperSlide = useSwiperSlide()
    const [isCurrent, setIsCurrent] = useState<number | null>(null)

    return (
        <Swiper
            spaceBetween={30}
            //slidesPerView={3}
            onSlideChange={(e) => { setIsCurrent(e.realIndex) }}
            onSwiper={(swiper) => console.log(swiper)}
            className='z-[10] w-full'
            modules={[/* Navigation, */ Pagination, Autoplay/* Scrollbar, A11y, */]}
            pagination={{
                clickable: true, renderBullet: function (index, className) {
                    return '<span class="' + className + '" style="background-color: #fff">' + '<PiDotOutlineFill />' + '</span>';
                },
            }}
            centeredSlides={true}
            slidesPerView={'auto'}
            grabCursor
            //scrollbar={{ draggable: true }}
            //navigation
            loop
            autoplay={{
                delay: 10000,
                disableOnInteraction: false,
            }}
            initialSlide={0}
        >
            {
                // JSON.stringify(swiperSlide.isActive)
            }

            <SwiperSlide className='w-full ' style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={`lg:h-[400px] lg:w-[800px] px-4 ${isCurrent === 0 ? 'opacity-100' : 'opacity-10'} transition-all  duration-300 ease-in-out`}>
                    <div className='lg:w-[800px] lg:h-[400px] '>
                        <div className=' flex flex-col md:flex-row justify-between lg:w-[800px] md:h-[400px] border border-white/10 rounded-2xl'>
                            <div>
                                <div className='flex-col md:w-[280px] md:h-full flex justify-between items-center bg-radial-[100%_60%_at_0%_0%] from-violet-500/70 from-0%  to-100% to-[#07090D] rounded-tl-2xl rounded-bl-2xl pb-10'>
                                    <Image src={Test1} alt='' className='w-[96px] md:w-[110px] h-auto md:pt-16 pt-10' />

                                    <div className=''>
                                        <div className='flex flex-col justify-center items-center gap-4 md:mt-0 mt-8 md:mb-16'>
                                            <span className='font-medium text-white/50 text-xs md:text-base'>REDES SOCIAIS</span>

                                            <div className='flex gap-2'>

                                                <div className='p-2 rounded-full bg-violet-500 w-fit'>
                                                    <svg className="md:size-6 size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>

                                                <div className='p-2 rounded-full bg-violet-500 w-fit'>
                                                    <svg className="md:size-6 size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>


                                            </div>
                                        </div>

                                        <button className='bg-white hidden md:flex items-center gap-2 text-[#07090D] px-6 py-2 rounded-full font-semibold'>Case de Sucesso
                                            <Image src={Arrow} alt='' />
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <div className='w-full border-l border-white/10 px-8 pb-8 md:p-10 '>
                                <div>
                                    <h4 className='font-semibold'>Jefferson Cardoso</h4>
                                    <p className='text-white/50'>Proprietário</p>
                                </div>

                                <p className='mt-6 text-ellipsis overflow-hidden'>
                                    {'"'}O Telesys foi uma verdadeira revolução na minha empresa,
                                    hoje tenho controle de tudo, sem falar da economia que o
                                    produto nos traz. Tenho uma revenda à qual não tenho atendentes,
                                    os pedidos são enviados, e assim os entregadores imprimem o pedido
                                    e fazem as entregas, controlo fluxo de vendas por áreas proporcionando
                                    assim uma economia nas campanhas, sei exatamente qual área está
                                    precisando de mais atenção, sem falar que tenho controle financeiro
                                    de todas as entradas e saídas.{'"'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide className='w-full ' style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={`lg:h-[400px] lg:w-[800px] px-4 ${isCurrent === 1 ? 'opacity-100' : 'opacity-10'} transition-all  duration-300 ease-in-out`}>
                    <div className='lg:w-[800px] lg:h-[400px] '>
                        <div className=' flex flex-col md:flex-row justify-between lg:w-[800px] md:h-[400px] border border-white/10 rounded-2xl'>
                            <div>
                                <div className='flex-col md:w-[280px] md:h-full flex justify-between items-center bg-radial-[100%_60%_at_0%_0%] from-emerald-500/70 from-0%  to-100% to-[#07090D] rounded-tl-2xl rounded-bl-2xl pb-10'>
                                    <Image src={Test1} alt='' className='w-[96px] md:w-[110px] h-auto md:pt-16 pt-10' />

                                    <div className=''>
                                        <div className='flex flex-col justify-center items-center gap-4 md:mt-0 mt-8 md:mb-16'>
                                            <span className='font-medium text-white/50 text-xs md:text-base'>REDES SOCIAIS</span>

                                            <div className='flex gap-2'>

                                                <div className='p-2 rounded-full bg-emerald-500 w-fit'>
                                                    <svg className="md:size-6 size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>

                                                <div className='p-2 rounded-full bg-emerald-500 w-fit'>
                                                    <svg className="md:size-6 size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>


                                            </div>
                                        </div>

                                        <button className='bg-white hidden md:flex items-center gap-2 text-[#07090D] px-6 py-2 rounded-full font-semibold'>Case de Sucesso
                                            <Image src={Arrow} alt='' />
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <div className='w-full border-l border-white/10 px-8 pb-8 md:p-10 '>
                                <div>
                                    <h4 className='font-semibold'>Jefferson Cardoso</h4>
                                    <p className='text-white/50'>Proprietário</p>
                                </div>

                                <p className='mt-6 text-ellipsis overflow-hidden'>
                                    {'"'}O Telesys foi uma verdadeira revolução na minha empresa,
                                    hoje tenho controle de tudo, sem falar da economia que o
                                    produto nos traz. Tenho uma revenda à qual não tenho atendentes,
                                    os pedidos são enviados, e assim os entregadores imprimem o pedido
                                    e fazem as entregas, controlo fluxo de vendas por áreas proporcionando
                                    assim uma economia nas campanhas, sei exatamente qual área está
                                    precisando de mais atenção, sem falar que tenho controle financeiro
                                    de todas as entradas e saídas.{'"'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide className='w-full ' style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={`lg:h-[400px] lg:w-[800px] px-4 ${isCurrent === 2 ? 'opacity-100' : 'opacity-10'} transition-all  duration-300 ease-in-out`}>
                    <div className='lg:w-[800px] lg:h-[400px] '>
                        <div className=' flex flex-col md:flex-row justify-between lg:w-[800px] md:h-[400px] border border-white/10 rounded-2xl'>
                            <div>
                                <div className='flex-col md:w-[280px] md:h-full flex justify-between items-center bg-radial-[100%_60%_at_0%_0%] from-sky-500/70 from-0%  to-100% to-[#07090D] rounded-tl-2xl rounded-bl-2xl pb-10'>
                                    <Image src={Test1} alt='' className='w-[96px] md:w-[110px] h-auto md:pt-16 pt-10' />

                                    <div className=''>
                                        <div className='flex flex-col justify-center items-center gap-4 md:mt-0 mt-8 md:mb-16'>
                                            <span className='font-medium text-white/50 text-xs md:text-base'>REDES SOCIAIS</span>

                                            <div className='flex gap-2'>

                                                <div className='p-2 rounded-full bg-sky-600 w-fit'>
                                                    <svg className="md:size-6 size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>

                                                <div className='p-2 rounded-full bg-sky-600 w-fit'>
                                                    <svg className="md:size-6 size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>


                                            </div>
                                        </div>

                                        <button className='bg-white hidden md:flex items-center gap-2 text-[#07090D] px-6 py-2 rounded-full font-semibold'>Case de Sucesso
                                            <Image src={Arrow} alt='' />
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <div className='w-full border-l border-white/10 px-8 pb-8 md:p-10 '>
                                <div>
                                    <h4 className='font-semibold'>Jefferson Cardoso</h4>
                                    <p className='text-white/50'>Proprietário</p>
                                </div>

                                <p className='mt-6 text-ellipsis overflow-hidden'>
                                    {'"'}O Telesys foi uma verdadeira revolução na minha empresa,
                                    hoje tenho controle de tudo, sem falar da economia que o
                                    produto nos traz. Tenho uma revenda à qual não tenho atendentes,
                                    os pedidos são enviados, e assim os entregadores imprimem o pedido
                                    e fazem as entregas, controlo fluxo de vendas por áreas proporcionando
                                    assim uma economia nas campanhas, sei exatamente qual área está
                                    precisando de mais atenção, sem falar que tenho controle financeiro
                                    de todas as entradas e saídas.{'"'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>




            <div className='mt-12'></div>
        </Swiper>
    )
}