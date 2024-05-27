import React from "react"
import { twMerge } from "tailwind-merge"

interface CardContainerProps {
    children: React.ReactNode
    className?: string
}

export default function CardContainer(props: CardContainerProps) {
    return (
        <div className={twMerge('bg-white py-4 w-full rounded-md shadow-xl', props.className)}>
            {props.children}
        </div>
    )
}