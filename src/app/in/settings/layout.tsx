import { Metadata } from "next";
// import NavSidebar from "./components/NavSidebar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { GRADIENT_TEXT_CLASSNAME } from "@/util/constants";
import NavSidebar from "./components/NavSidebar";

export const metadata: Metadata = {
    title: "Settings",
};

const navLinks = [
    {
        label: "Account Preferences",
        href: "/in/settings/account-settings",
    }
]



export default function SettingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div style={{
            height: "calc(100vh - 80px)"
        }}
            className="flex flex-row p-2 gap-2"
        >
            <NavSidebar />
            {children}
        </div>
    )

}