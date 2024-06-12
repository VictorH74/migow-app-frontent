"use client"
import Link from 'next/link';
import React from 'react';
import { authenticate } from '@/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const { pending } = useFormStatus()

  React.useEffect(() => {

    console.log(errorMessage, pending)

  }, [errorMessage, pending])

  const handleClick = (event: React.MouseEvent) => {
    if (pending) {
      event.preventDefault()
    }

  }

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
          <Link className='text-center' href="/register">Create account</Link>
          {/* <div>{errorMessage && <p>{errorMessage}</p>}</div> */}
          <button className='bg-gradient p-2 rounded-md text-white mt-2 hover:brightness-110 duration-150' aria-disabled={pending} type="submit" onClick={handleClick}>{pending ? "Submitting..." : "Submit"}</button>
        </form>
      </main>
    </div>
  );
}