
//import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "./Button";
import { ReactNode } from "react";

type TitleSectionProps = {
    title: string
    description?: string
    buttons?: boolean
    titleButtonSolid?: string
    titleButtonOutline?: string
    icon?: ReactNode
    onClickButtonSolid?: () => void
    onClickButtonOutline?: () => void
}

export function TitleSection({
    title,
    description,
    buttons,
    titleButtonSolid,
    titleButtonOutline,
    icon
}: TitleSectionProps) {


    return (
        <div className="flex flex-col items-center">
            <h3 className="text-5xl font-bold max-w-[360px] text-center">{title}</h3>

            <p className="max-w-[460px] text-center text-white/80 mt-10">{description}</p>

            {
                buttons && titleButtonSolid && titleButtonOutline &&
                <div className="flex gap-4 mt-10">
                    <Link href={'https://wa.me/553184372245'} target="_blank">
                        <Button title={titleButtonSolid} icon={icon} />
                    </Link>
                    <Button title={titleButtonOutline} variant="OUTLINE" />
                </div>
            }
        </div>
    )
}