import Image from 'next/image'
import Logo from '../../../public/logo.png'

export default function Header() {
    return (
        <nav className="bg-[#07090DCC] backdrop-blur-md fixed w-full z-[999999]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src={Logo} className='h-9 w-auto' alt="Flowbite Logo" />

                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" className="text-white bg-sky-700 hover:bg-sky-800 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-sky-300 hidden md:block font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">Saiba mais</button>
                    <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
                        <li>
                            <a href="#" className="block py-2 px-3 md:p-0 text-white bg-sky-700 rounded-sm md:bg-transparent md:text-sky-700 md:dark:text-sky-500" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-700 md:dark:hover:text-sky-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Suporte</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-700 md:dark:hover:text-sky-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Módulos</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-700 md:dark:hover:text-sky-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contato</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="w-[50%] h-[1px] bg-gradient-to-l from-[#F5F7FA27] to-" />
                <div className="w-[50%] h-[1px] bg-gradient-to-r from-[#F5F7FA27] to- " />
            </div>
        </nav>
    )
}