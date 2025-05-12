import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    variant?: 'SOLID' | 'OUTLINE'
    icon?: ReactNode
}

export function Button({ title, variant = 'SOLID', icon, ...rest }: ButtonProps) {
    return (
        <button {...rest} className={`${variant === 'SOLID' && 'bg-sky-600 hover:bg-sky-700 hover:cursor-pointer'} ${variant === 'OUTLINE' && 'border border-[#4C5155] hover:cursor-pointer'} px-5 py-3 rounded-lg flex items-center gap-2 font-semibold`}>
            {icon && icon} {title}
        </button>
    )
}