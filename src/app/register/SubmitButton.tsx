"use client"
import { useFormStatus } from "react-dom"

export default function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button className='bg-gradient p-2 rounded-md text-white mt-2 hover:brightness-110 duration-150' aria-disabled={pending} type="submit">{pending ? "Submitting..." : "Submit"}</button>
    )
}