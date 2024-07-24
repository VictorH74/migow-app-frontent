import { clientHTTPCtx } from "@/contexts/ClientHTTPProvider";
import { use } from "react";

export default function useClientHTTP() {
    const ctx = use(clientHTTPCtx)

    if (!ctx) throw new Error("useClientHTTP must be into a ClientHTTPProvider")

    return ctx;
}