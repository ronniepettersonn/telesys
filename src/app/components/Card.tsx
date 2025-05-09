import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
    return (
        <div className="rounded-3xl p-px bg-gradient-to-b from-[#4C5155] to-transparent">
            <div className="bg-gradient-to-t from-[#0f141d] to-[#07090D] p-10 rounded-[calc(1.5rem-1px)]">
                {children}
            </div>
        </div>
    )
}