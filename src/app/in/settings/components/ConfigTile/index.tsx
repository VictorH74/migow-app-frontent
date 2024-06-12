"use client"
import React from "react"
import LaunchIcon from '@mui/icons-material/Launch';
import { createPortal } from "react-dom";

const ModalContainer = React.lazy(() => import("@/components/ModalContainer"));

interface ConfigTileProps {
    label: string
    formContent: React.ReactNode
    onSubmit(): Promise<void>
}

export default function ConfigTile({ label, formContent, onSubmit }: ConfigTileProps) {
    const [showModal, setShowModal] = React.useState(false);
    const [isSubmiting, setIsSubmiting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSubmiting(true)
        await onSubmit()
        setIsSubmiting(false)
        setShowModal(false)
        alert("Change saved! 👍")
    }

    return (
        <li
            className="flex justify-between px-5 py-7 cursor-pointer hover:bg-black/5"
            onClick={() => setShowModal(true)}
        >
            <p className="text-gray-500 font-semibold">{label}</p>
            <button>
                <LaunchIcon />
            </button>
            {
                showModal && createPortal(
                    <ModalContainer
                        modalClassName="size-fit p-7"
                        onClose={() => setShowModal(false)}
                    >
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-xl text-gray-500 text-center">{label}</h2>
                            {formContent}
                            <button className="text-white font-semibold bg-gradient py-2 px-7 w-full rounded-md duration-200 hover:brightness-110">{isSubmiting ? "Submiting..." : "Save Change"}</button>
                        </form>
                    </ModalContainer>,
                    document.body
                )
            }
        </li>
    )
}