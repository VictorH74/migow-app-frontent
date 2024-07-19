import { clientHTTPCtx } from "@/contexts/ClientHTTPProvider";
import { useContext } from "react";

export default function useClientHTTP() {
    const ctx = useContext(clientHTTPCtx)

    if (!ctx) throw new Error("useClientHTTP must be into a ClientHTTPProvider")

    return ctx;
}