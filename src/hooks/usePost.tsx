import { postCtx } from "@/contexts/PostProvider";
import { use } from "react";

export default function usePost() {
    const ctx = use(postCtx);

    if (!ctx) throw new Error("usePost must be into a PostProvider")

    return ctx
}