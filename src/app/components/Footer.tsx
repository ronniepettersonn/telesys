import Image from "next/image";
import Logo from '../../../public/logo.png'
//import { Badget } from "./Badget";

export default function Footer() {
    return (
        <>
            <footer /* className="border-t border-[#4C5155] max-w-[1200px] m-auto" */>
                <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="flex justify-center text-teal-600 dark:text-teal-300">
                        <Image src={Logo} alt="Logo" className='h-11 w-auto' />
                    </div>

                    <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-400">
                        O Sistema Telesys é um software de Gestão voltado para revendas de GLP
                        que tem revolucionado o mercado.
                    </p>

                    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                        <li>
                            <a
                                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                                href="#"
                            >
                                About
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                                href="#"
                            >
                                Careers
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                                href="#"
                            >
                                History
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                                href="#"
                            >
                                Services
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                                href="#"
                            >
                                Projects
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                                href="#"
                            >
                                Blog
                            </a>
                        </li>
                    </ul>

                    <ul className="mt-12 flex justify-center gap-6 md:gap-8">
                        <li>
                            <a
                                href="#"
                                rel="noreferrer"
                                target="_blank"
                                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white/50 dark:hover:text-white/75"
                            >
                                <span className="sr-only">Facebook</span>
                                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                rel="noreferrer"
                                target="_blank"
                                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white/50 dark:hover:text-white/75"
                            >
                                <span className="sr-only">Instagram</span>
                                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                rel="noreferrer"
                                target="_blank"
                                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white/50 dark:hover:text-white/75"
                            >
                                <span className="sr-only">Instagram</span>
                                <svg fill="currentColor" viewBox="0 0 32 32" className="size-6">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.932 20.459v-8.917l7.839 4.459zM30.368 8.735c-0.354-1.301-1.354-2.307-2.625-2.663l-0.027-0.006c-3.193-0.406-6.886-0.638-10.634-0.638-0.381 0-0.761 0.002-1.14 0.007l0.058-0.001c-0.322-0.004-0.701-0.007-1.082-0.007-3.748 0-7.443 0.232-11.070 0.681l0.434-0.044c-1.297 0.363-2.297 1.368-2.644 2.643l-0.006 0.026c-0.4 2.109-0.628 4.536-0.628 7.016 0 0.088 0 0.176 0.001 0.263l-0-0.014c-0 0.074-0.001 0.162-0.001 0.25 0 2.48 0.229 4.906 0.666 7.259l-0.038-0.244c0.354 1.301 1.354 2.307 2.625 2.663l0.027 0.006c3.193 0.406 6.886 0.638 10.634 0.638 0.38 0 0.76-0.002 1.14-0.007l-0.058 0.001c0.322 0.004 0.702 0.007 1.082 0.007 3.749 0 7.443-0.232 11.070-0.681l-0.434 0.044c1.298-0.362 2.298-1.368 2.646-2.643l0.006-0.026c0.399-2.109 0.627-4.536 0.627-7.015 0-0.088-0-0.176-0.001-0.263l0 0.013c0-0.074 0.001-0.162 0.001-0.25 0-2.48-0.229-4.906-0.666-7.259l0.038 0.244z"
                                        clipRule="evenodd"
                                    />

                                </svg>
                            </a>
                        </li>

                    </ul>
                </div>
                {/* <div className="flex w-full m-auto max-w-[1200px] border-t border-[#4C5155]">
                    <div className="flex justify-center w-full pt-4  pb-8">
                        <div className="flex items-center">
                            <p className="text-white/50">Copyright © 2025 Netxpert · All rights reserved.</p>
                        </div>
                    </div>

                </div> */}
            </footer>
            {/* <div className="flex w-full m-auto max-w-[1200px] border-t border-[#4C5155] mt-8">
                <div className="py-16 flex justify-between w-full">
                    <div>
                        <Image src={Logo} alt="Logo" className='h-9 w-auto' />
                    </div>

                    <div className="flex ">
                        <div className="flex flex-col gap-4 w-[200px]">
                            <span className="font-semibold">Produtos</span>
                            <p className="text-white/80">Telesys</p>
                            <p className="text-white/80">Netfiscal</p>
                            <div className="flex gap-2">
                                <p className="text-white/80">Telefonia</p>
                                <Badget />
                            </div>
                            <p className="text-white/80">Botzap</p>
                            <p className="text-white/80">Rastreio GPS</p>
                        </div>

                        <div className="flex flex-col gap-4 w-[200px]">
                            <span className="font-semibold">Links</span>
                            <p className="text-white/80">Anydesk</p>
                            <p className="text-white/80">Teamviewer</p>
                            <p className="text-white/80">Ammy ADMIN</p>
                            <p className="text-white/80">Netxpert</p>

                        </div>

                        <div className="flex flex-col gap-4 w-[160px]">
                            <span className="font-semibold">Redes sociais</span>
                            <p className="text-white/80">Instagram</p>
                            <p className="text-white/80">Youtube</p>
                            <p className="text-white/80">Facebook</p>


                        </div>

                    </div>

                </div>
            </div> */}

            {/* <div className="flex w-full m-auto max-w-[1200px] border-t border-[#4C5155]">
                <div className="flex justify-between w-full pt-4  pb-8">
                    <div className="flex gap-4 ">
                        <span>Privacy</span>
                        <span>Terms of use</span>
                        <span>Security</span>
                    </div>
                    <div className="flex items-center">
                        <p className="text-white/50">© 2024 Netxpert · All rights reserved.</p>
                    </div>
                </div>

            </div> */}
        </>
    )
}