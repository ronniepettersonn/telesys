'use client'

import Image from 'next/image'
import Logo from '../../../public/logo.png'

export default function HeaderSecondary() {

    return (
        <>
            <nav className="backdrop-blur-md fixed w-full z-[999999]">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image src={Logo} className='h-9 w-auto' alt="Logo Telesys" />
                    </a>


                </div>
                <div className="flex justify-between">
                    <div className="w-[50%] h-[1px] bg-gradient-to-l from-[#F5F7FA27] to-" />
                    <div className="w-[50%] h-[1px] bg-gradient-to-r from-[#F5F7FA27] to- " />
                </div>
            </nav>

        </>
    )
}