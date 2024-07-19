import React, { PropsWithChildren } from "react";
import axios from "axios"
import { ClientHTTPWithAxios } from "@/lib/clientHTTP/clientHTTPWithAxios";
import { ClientHTTPInterface } from "@/lib/clientHTTP/interfaces";

interface ClientHTTPProvider extends PropsWithChildren { }

export const clientHTTPCtx = React.createContext<ClientHTTPInterface | null>(null);


export default function ClientHTTPProvider(props: ClientHTTPProvider) {
    const clientHTTP = React.useMemo(() => {
        const axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL
        })

        return new ClientHTTPWithAxios(axiosInstance);
    }, [])

    return (
        <clientHTTPCtx.Provider value={clientHTTP}>
            {props.children}
        </clientHTTPCtx.Provider>
    )
}