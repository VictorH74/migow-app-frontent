"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { twMerge } from "tailwind-merge"

export default function NavSidebar() {
    const pathname = usePathname()
    const navButtons = React.useMemo(() => [
        {
            label: "Account Preferences",
            href: "/in/settings/account-preferences",
        },
        {
            label: "Privacy",
            href: "/in/settings/privacy",
        },
        {
            label: "Notifications",
            href: "/in/settings/notifications",
        },
    ], [])

    const isActive = (name: string) => pathname === name;

    return (
        <aside className='bg-white h-full w-[300px] rounded-md shadow-lg'>
            <h1 className="text-center text-2xl font-semibold text-gray-500 my-3">Settings</h1>
            <div className="h-[2px] w-full bg-gray-500 mb-2" />
            <ul>
                {navButtons.map(link => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                        >
                            <p
                                className={twMerge("text-center p-2 my-1 text-lg font-semibold text-gray-500", isActive(link.href) ? "text-gradient" : "")}
                            >
                                {link.label}
                            </p>

                        </Link>
                    </li>
                ))}
            </ul>

        </aside>
    )
}