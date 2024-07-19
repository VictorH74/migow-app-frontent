"use client"

import ClientHTTPProvider from "@/contexts/ClientHTTPProvider";
import { PropsWithChildren } from "react";

export default function Providers(props: PropsWithChildren) {
    return (
        <ClientHTTPProvider>
            {props.children}
        </ClientHTTPProvider>
    )
}