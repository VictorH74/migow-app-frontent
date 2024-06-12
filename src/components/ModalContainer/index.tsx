/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React from "react";
import { createPortal } from "react-dom";
import CloseIcon from '@mui/icons-material/Close';
import { twMerge } from "tailwind-merge";

interface ModalContainerProps {
    children: React.ReactNode
    onClose(): void
    modalClassName?: string

}

export default function ModalContainer(props: ModalContainerProps) {
    const modalRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        const paddingRight = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${paddingRight}px`;
        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
    }, [])

    const handleClose = React.useCallback(() => {
        if (!modalRef.current) return;

        const modal = modalRef.current

        modal.style.scale = "0"
        modal.style.opacity = "0"
        setTimeout(() => {
            props.onClose()
        }, 100)

    }, [])

    return createPortal(
        <div onClick={handleClose} className="fixed inset-0 animate-fadein backdrop-blur-md bg-black/15 grid place-items-center">
            <div
                className={twMerge("animate-scale h-[800px] w-full max-w-[700px] bg-white duration-200 p-4 relative text-center rounded-md shadow-md overflow-hidden", props.modalClassName)}
                ref={modalRef}
                onClick={e => e.stopPropagation()}
            >

                <button className="absolute top-2 right-2" onClick={handleClose}><CloseIcon /></button>
                {props.children}

            </div>
        </div>,
        document.body
    )

}