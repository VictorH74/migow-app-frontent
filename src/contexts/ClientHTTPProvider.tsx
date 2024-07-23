"use client"
import React, { PropsWithChildren } from "react";
import axios from "axios"
import { ClientHTTPInterface } from "@/lib/clientHTTP/interfaces";
import { clientHTTPWithStandartFetch } from "@/lib/clientHTTP/clientHTTPWithStandartFetch";

interface ClientHTTPProvider extends PropsWithChildren { 
    recoveredToken?: string
}

export const clientHTTPCtx = React.createContext<ClientHTTPInterface | null>(null);


export default function ClientHTTPProvider(props: ClientHTTPProvider) {
    const clientHTTP = React.useMemo(() => {
        // const axiosInstance = axios.create({
        //     baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL
        // })

        // if (!!props.recoveredToken)
        //     axiosInstance.defaults.headers.Authorization = `Bearer ${props.recoveredToken}`

        // return new ClientHTTPWithAxios(axiosInstance);
        return new clientHTTPWithStandartFetch();
    }, [])

    return (
        <clientHTTPCtx.Provider value={clientHTTP}>
            {props.children}
        </clientHTTPCtx.Provider>
    )
}