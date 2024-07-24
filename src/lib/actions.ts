'use server'
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

type TokenType = {
    accessToken: string
}

export async function authenticate(_currentState: unknown, formData: FormData) {
    const credentials = {
        login: formData.get("login"),
        password: formData.get("password")
    }

    let ok = false

    try {
        const res = (await (await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/u-s/auth/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json())

        if (res.message) return res as { message: string, status: number }

        const token = res as TokenType

        cookies().set('accessToken', token.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 30 * 24 * 60 * 60, // 30 dias
        })

        ok = true
    } catch (e) {
        // console.error(e)
    } finally {
        if (ok) redirect("/")
    }

}

const getIdFromtoken = (token: string) => (jwtDecode(token).sub) as string;

export async function serverFetch<T>(url: `/${string}`, init?: RequestInit, tagToRevalidate?: string) {
    const ownerToken = cookies().get("accessToken");

    console.log(init)

    const res = await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_URL + url.replaceAll("{tokenUserId}", getIdFromtoken(ownerToken!.value)),
        {
            ...init,
            headers: { ...init?.headers, "Authorization": `Bearer ${ownerToken?.value!}` }
        }
    );

    const data = await res.json();
    if (!!tagToRevalidate) revalidateTag(tagToRevalidate)
    return data as T;
}

export async function detroyJWT() {
    cookies().delete("accessToken")

    redirect("/")
}