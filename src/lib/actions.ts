'use server';
import { UserInterface } from '@/interfaces/User';
import { TokenType } from '@/types';
import { jwtDecode } from 'jwt-decode';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const registerToken = (token: TokenType) => {
    const decodedToken = jwtDecode(token.accessToken);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const expirationInSeconds = (decodedToken.exp || 0) - currentTimeInSeconds;

    cookies().set('accessToken', token.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: expirationInSeconds,
    });
};

export const getCurrentUser = () =>
    serverFetch<UserInterface.SimpleType>('/u-s/users/{tokenUserId}');

export async function register(_currentState: unknown, formData: FormData) {
    // TODO: validate data
    const obj: UserInterface.CreateType = {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
        name:
            (formData.get('name') as string) +
            ' ' +
            (formData.get('surname') as string),
        email: formData.get('email') as string,
        bgImageUrl: formData.get('bgImageUrl') as string | null,
        profileImageUrl: formData.get('profileImageUrl') as string | null,
    };

    let ok = false;

    try {
        const res = await (
            await fetch(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/u-s/auth/register`,
                {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
        ).json();

        if (res.message) return res as { message: string; status: number };

        registerToken(res as TokenType);

        ok = true;
    } catch (e) {
        console.error(e);
    } finally {
        if (ok) redirect('/');
    }
}

export async function authenticate(_currentState: unknown, formData: FormData) {
    const credentials = {
        login: formData.get('login'),
        password: formData.get('password'),
    };

    let ok = false;

    try {
        const res = await (
            await fetch(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/u-s/auth/login`,
                {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
        ).json();

        if (res.message) return res as { message: string; status: number };

        registerToken(res as TokenType);

        ok = true;
    } catch (e) {
        // console.error(e)
    } finally {
        if (ok) redirect('/');
    }
}

const getIdFromtoken = (token: string) => jwtDecode(token).sub as string;

// TODO: redirect user to login page if query fail with statis 401
export async function serverFetch<T = string>(
    url: `/${string}`,
    init?: RequestInit,
    tagToRevalidate?: string
) {
    const ownerToken = cookies().get('accessToken');

    if (init?.body && typeof init.body == 'string') {
        init.body = init.body.replaceAll(
            '{tokenUserId}',
            getIdFromtoken(ownerToken!.value)
        );
    }

    try {
        const res = await fetch(
            process.env.NEXT_PUBLIC_API_GATEWAY_URL +
                url.replaceAll(
                    '{tokenUserId}',
                    getIdFromtoken(ownerToken!.value)
                ),
            {
                ...init,
                headers: {
                    ...init?.headers,
                    Authorization: `Bearer ${ownerToken?.value!}`,
                },
            }
        );

        if (tagToRevalidate) revalidateTag(tagToRevalidate);

        const contentType = res.headers.get('content-type');

        const data = await (contentType &&
        contentType.includes('application/json')
            ? res.json()
            : res.text());

        return data as T;
    } catch (err) {
        return undefined;
    }
}

export async function detroyJWT() {
    cookies().delete('accessToken');

    redirect('/');
}
