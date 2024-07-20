"use client"

import ClientHTTPProvider from "@/contexts/ClientHTTPProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

interface ClientGlobalProvidersProps extends PropsWithChildren {
    recoveredToken?: string
}

const queryClient = new QueryClient()

export default function ClientGlobalProviders(props: ClientGlobalProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ClientHTTPProvider recoveredToken={props.recoveredToken}>
                {props.children}
            </ClientHTTPProvider>
        </QueryClientProvider>
    )
}