"use client"
import Link from 'next/link';
import React from 'react';
import { authenticate } from '@/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import SubmitButton from './SubmitButton';
import useClientHTTP from '@/hooks/useClientHTTP';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const clientHTTP = useClientHTTP();
  const router = useRouter()
  const [errorMessage, dispatch] = useFormState(authenticate, {message: "", status: 0})

  // const [errorMessage, dispatch] = useFormState(async (_currentState: unknown, formData: FormData) => {
  //   try {
  //     const token = await authenticate(_currentState, formData);
  //     clientHTTP.setAuthorization(token);
  //     // clientHTTP.setAuthorization(token); // Define o token no cliente HTTP
  //     // Redireciona para a página inicial após o login bem-sucedido
  //     // window.location.href = "/";
  //     router.replace("/")
  //   } catch (error) {
  //     console.error(error);
  //     // Defina a mensagem de erro apropriada aqui
  //   }
  // }, undefined);

  return (
    <div className='w-screen h-screen grid place-items-center'>
      <main className='py-7 px-5 bg-white min-w-[400px] shadow-lg'>
        <div className='text-center mb-4'>
          <h1 className='text-gradient text-2xl w-fit m-auto' >MigoW</h1>
          <div className='w-24 h-[2px] bg-gray-500 m-auto my-2' />
          <p className='text-gray-500 font-semibold'>Login</p>
        </div>
        <form action={dispatch} className='flex flex-col gap-1'>
          <label htmlFor="login-input" className='text-gray-500'>
            Login
          </label>
          <input id='login-input' name='login' className='border-2 border-gray-400 p-2 outline-none rounded-md' type="text" placeholder='Username or email' />
          <label htmlFor="password-input" className='text-gray-500'>
            Password
          </label>
          <input id='password-input' className='border-2 border-gray-400 p-2 outline-none rounded-md' type="password" name='password' />
          {errorMessage?.message && <p className='text-red-700 text-sm font-semibold'>{errorMessage.message}</p>}
          <Link className='text-center' href="/register">Create account</Link>
          {/* <div>{errorMessage && <p>{errorMessage}</p>}</div> */}
          <SubmitButton />
        </form>
      </main>
    </div>
  );
}