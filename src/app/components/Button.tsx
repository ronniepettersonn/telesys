import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    variant?: 'SOLID' | 'OUTLINE'
}

export function Button({ title, variant = 'SOLID', ...rest }: ButtonProps) {
    return (
        <button {...rest} className={`${variant === 'SOLID' && 'bg-sky-600 hover:bg-sky-700 hover:cursor-pointer'} ${variant === 'OUTLINE' && 'border border-[#4C5155] hover:cursor-pointer'} px-5 py-3 rounded-lg font-semibold`}>
            {title}
        </button>
    )
}