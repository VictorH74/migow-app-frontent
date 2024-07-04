'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation";


export async function authenticate(_currentState: unknown, formData: FormData) {

    /*
      try {
            await signIn('credentials', formData)
        } catch (error) {
            if (error) {
            switch (error.type) {
                case 'CredentialsSignin':
                return 'Invalid credentials.'
                default:
                return 'Something went wrong.'
            }
            }
            throw error
        }
    */

    await new Promise<void>((res) => {
        setTimeout(res, 2000);
    })

    const token = "my-generated-token"

    cookies().set('currentUser', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 dias
    })

    redirect("/")
}