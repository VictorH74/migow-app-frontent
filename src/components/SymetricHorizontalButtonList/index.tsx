/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React from "react"
import { twMerge } from "tailwind-merge"

interface SymetricHorizontalButtonListProps {
    btnData: ButtonDataType[]
    renderDelay?: number
    buttonClassName?: string
}

type ButtonDataType = {
    label: string,
    ref: React.RefObject<HTMLButtonElement>,
    onClick(): void
    selected?: boolean
}

export default function SymetricHorizontalButtonList(props: SymetricHorizontalButtonListProps) {

    React.useEffect(() => {
        setTimeout(() => {
            const refs = props.btnData.map(btn => btn.ref);

            if (refs.every(ref => !!ref.current)) {
                const btnWidths = refs.map(r => r.current!.getBoundingClientRect().width)
                const maxWidth = Math.max(...btnWidths)

                let index = 0
                for (const ref of refs) {
                    ref.current!.style.width = maxWidth + "px"
                    setTimeout(() => {
                        ref.current!.style.opacity = "1"
                    }, index * 80)
                    index++
                }
            }
        }, props.renderDelay || 0)

    }, [props.btnData])

    return (
        <div className='flex gap-1 overflow-hidden rounded-2xl h-fit'>
            {
                props.btnData.map(btn => (
                    <button
                        type="button"
                        key={btn.label}
                        ref={btn.ref}
                        onClick={btn.onClick}
                        className={twMerge('p-2 bg-gray-500 text-white opacity-0 duration-200  hover:bg-gray-400', btn.selected ? "bg-gray-400" : "", props.buttonClassName)}
                    >
                        {btn.label}
                    </button>
                ))
            }
        </div>

    )
}