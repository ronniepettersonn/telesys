'use client'

import Image from 'next/image'
import Logo from '../../../public/logo.png'
import { PiArrowRightBold, PiXBold } from 'react-icons/pi'
import Link from 'next/link'
import { Link as LinkScroll } from 'react-scroll/modules'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

import { AnimatePresence, motion } from "motion/react"

export default function Header({ showPromotion, setShowPromotion }: { showPromotion: boolean, setShowPromotion: (state: boolean) => void }) {
    const [isActive, setIsActive] = useState('home')
    const [isOpen, setIsOpen] = useState(false)

    function handleClosePromotion() {
        setShowPromotion(false)
    }

    return (
        <>
            <nav className="bg-[#07090DCC] backdrop-blur-md fixed w-full z-[999999]">
                {
                    showPromotion &&
                    <div className='flex flex-col md:flex-row md:h-13 py-2 justify-center items-center bg-gradient-to-r to-[#07090DCC] via-sky-900 w-full relative'>
                        <div className='md:mr-12 mb-2 md:mb-0 py-1 px-8 bg-sky-950 border border-sky-400 rounded-full'>
                            <p className='font-semibold '>50% OFF</p>
                        </div>

                        <p className=''>Emissão de <strong>NFCE</strong> e <strong>NFE</strong>  com 50% de desconto</p>

                        <div className='md:ml-12 '>
                            <Link href={'https://api.whatsapp.com/send?phone=5531984372245&text=📌%20Olá%2C%20eu%20ví%20no%20seu%20site%20o%20desconto%20de%2050%25%20para%20contratação%20de%20NFE%20e%20NFCE.%0AGostaria%20de%20mais%20informação.'} target='_blank'>
                                <button className='border-b flex items-center  hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out gap-2 py-1 border-white/50 font-semibold'>Contratar Agora <PiArrowRightBold /></button>
                            </Link>
                        </div>

                        <div className='absolute top-auto bottom-auto right-4 md:right-10'>
                            <button type='button' onClick={handleClosePromotion} className=' hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out rounded-full border border-white/20 p-1'>
                                <PiXBold />
                            </button>
                        </div>
                    </div>
                }
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image src={Logo} className='h-9 w-auto' alt="Logo Telesys" />
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <Link href={'https://wa.me/5531984372245'} target='_blank'>
                            <button type="button" className="text-white  hover:cursor-pointer focus:ring-4 focus:outline-none  hidden md:flex items-center gap-2 font-medium rounded-lg text-sm px-4 py-2  text-center bg-sky-600 hover:bg-sky-700 focus:ring-sky-800"><FaWhatsapp /> Contratar</button>
                        </Link>
                        <button data-collapse-toggle="navbar-cta" onClick={() => setIsOpen(true)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
                            <li>
                                <LinkScroll to='home' href='#home' spy smooth duration={800} onSetActive={() => setIsActive('home')} className={`${isActive === 'home' ? 'text-sky-500 font-bold' : 'text-white'} block py-2 px-3 md:p-0  rounded-sm md:bg-transparent md:hover:text-sky-500`} aria-current="page">Home</LinkScroll>
                            </li>
                            <li>
                                <LinkScroll to='suporte' href='#suporte' spy smooth duration={800} onSetActive={() => setIsActive('suporte')} className={`${isActive === 'suporte' ? 'text-sky-500 font-bold' : 'text-white'} block py-2 px-3 md:p-0  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:hover:text-sky-500   border-gray-700`}>Suporte</LinkScroll>
                            </li>
                            <li>
                                <LinkScroll to='modulos' href="#modulos" spy smooth duration={800} onSetActive={() => setIsActive('modulos')} className={`${isActive === 'modulos' ? 'text-sky-500 font-bold' : 'text-white'} block py-2 px-3 md:p-0  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:hover:text-sky-500  hover:text-white  border-gray-700`}>Módulos</LinkScroll>
                            </li>
                            <li>
                                <LinkScroll to='testar' href="#testar" spy smooth duration={800} onSetActive={() => setIsActive('testar')} className={`${isActive === 'testar' ? 'text-sky-500 font-bold' : 'text-white'} block py-2 px-3 md:p-0  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:hover:text-sky-500  hover:text-white  border-gray-700`}>Testar</LinkScroll>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="w-[50%] h-[1px] bg-gradient-to-l from-[#F5F7FA27] to-" />
                    <div className="w-[50%] h-[1px] bg-gradient-to-r from-[#F5F7FA27] to- " />
                </div>
            </nav>


            <div className='fixed z-[9999999]'>
                <AnimatePresence >
                    {
                        isOpen &&
                        <motion.div
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                ease: 'easeInOut',
                            }}
                            onClick={() => setIsOpen(false)}
                            className={`fixed top-0 left-0 h-full w-full backdrop-blur-md bg-[#07090DCC] flex`}>
                        </motion.div>
                    }
                </AnimatePresence>
                <AnimatePresence >
                    {
                        isOpen &&
                        <motion.div
                            /* initial={{ display: 'hidden', position: 'absolute', top: 0, right: '-400px', height: 'full' }}
                            animate={{ display: 'flex', right: '0', top: 0, position: "fixed" }}
                            exit={{ display: 'flex', right: '0', top: 0, position: "fixed" }} */
                            initial={{ x: '400px' }}
                            animate={{ x: 0 }}
                            exit={{ x: '400px' }}
                            transition={{
                                duration: 0.7,
                                ease: 'easeInOut',
                            }}
                            className={`bg-[#07090D] border-l border-[#F5F7FA27] w-[250px] h-full z-[9999999999] fixed top-0 right-0`}
                        >
                            <div className='flex flex-col relative w-full py-6'>
                                <div className='flex justify-center'>
                                    <Image src={Logo} className='h-9 w-auto' alt="Logo Telesys" />
                                </div>

                                <div className="max-w-screen-xl w-full flex items-center justify-between mx-auto p-4">
                                    <div className="items-center justify-between flex w-full order-1" id="navbar-cta">
                                        <ul className="flex flex-col w-full gap-2 font-medium p-4">
                                            <li>
                                                <a href='#home' onClick={() => (setIsActive('home'), setIsOpen(false))} className={` flex justify-start ${isActive === 'home' ? 'text-sky-500 font-bold' : 'text-white'} block py-2 px-3 p-0  rounded-lg hover:text-sky-500`} aria-current="page">Home</a>
                                            </li>
                                            <li>
                                                <a href='#suporte' onClick={() => (setIsActive('suporte'), setIsOpen(false))} className={` flex justify-start ${isActive === 'suporte' ? 'text-sky-500 font-bold' : 'text-white'} block py-2 px-3 p-0  rounded-sm    hover:text-sky-500   border-gray-700`}>Suporte</a>
                                            </li>
                                            <li>
                                                <a href="#modulos" onClick={() => (setIsActive('modulos'), setIsOpen(false))} className={` flex justify-start ${isActive === 'modulos' ? 'text-sky-500 font-bold' : 'text-white'} block py-2 px-3 p-0  rounded-sm    hover:text-sky-500   border-gray-700`}>Módulos</a>
                                            </li>
                                            <li>
                                                <a href="#testar" onClick={() => (setIsActive('testar'), setIsOpen(false))} className={` flex justify-start ${isActive === 'testar' ? 'text-sky-500 font-bold' : 'text-white'} block py-2 px-3 p-0  rounded-sm    hover:text-sky-500   border-gray-700`}>Testar</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>

        </>
    )
}