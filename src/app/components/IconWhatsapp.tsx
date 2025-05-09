"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export function IconWhatsapp() {
    const [openedChat, setOpenedChat] = useState<boolean | null>(true)

    function handleClickWhatsapp() {
        setOpenedChat(true)
        localStorage.setItem('@telesys:msgchat', 'true')
    }

    useEffect(() => {
        const storage = localStorage.getItem('@telesys:msgchat')

        if (storage) {
            const openedChat = JSON.parse(storage)

            return setOpenedChat(openedChat)
        }

        return setOpenedChat(false)
    }, [])

    return (
        <div className="relative z-50">
            {
                !openedChat &&
                <div className="fixed bottom-[112px] right-10 flex w-[338px] gap-2 rounded-l-[20px] rounded-tr-[20px] border border-[#152323] bg-[#060d0d] px-4 py-3 shadow-emerald-300/10 shadow-[0px_4px_32px_0px] sm:right-10 sm:w-[330px]">
                    <div>
                        <svg stroke="currentColor" fill="none" strokeWidth="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="shrink-0 fill-emerald-500" width="24" height="24"><path d="M2.5 10C6.25 10 10 6.25 10 2.5C10 6.25 13.75 10 17.5 10C13.75 10 10 13.75 10 17.5C10 13.75 6.25 10 2.5 10Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"></path><path d="M1.66666 16.2498C2.36111 16.2498 3.75 14.8609 3.75 14.1665C3.75 14.8609 5.13889 16.2498 5.83333 16.2498C5.13889 16.2498 3.75 17.6388 3.75 18.3332C3.75 17.6388 2.36111 16.2498 1.66666 16.2498Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"></path><path d="M13.3333 4.1665C14.1667 4.1665 15.8333 2.49984 15.8333 1.6665C15.8333 2.49984 17.5 4.1665 18.3333 4.1665C17.5 4.1665 15.8333 5.83317 15.8333 6.6665C15.8333 5.83317 14.1667 4.1665 13.3333 4.1665Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"></path></svg>
                    </div>
                    <div>
                        <p>Se você precisar de ajuda você pode nos <strong>Chamar no Whatsapp</strong>, basta clicar no botão:</p>
                    </div>
                </div>
            }

            <Link href={'https://api.whatsapp.com/send?phone=5531984372245&text=Olá%2C%20você%20pode%20me%20ajudar%3F'} target="_blank" onClick={handleClickWhatsapp}>
                <div className="fixed bottom-10 right-10 p-3 bg-emerald-400 rounded-2xl">
                    <FaWhatsapp size={32} />
                </div>
            </Link>
        </div>
    )
}