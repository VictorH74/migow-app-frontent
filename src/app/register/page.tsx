"use client"
import { register } from '@/lib/actions';
import Link from 'next/link';
import React from 'react';
import { useFormState } from 'react-dom';
import SubmitButton from './SubmitButton';

export default function RegisterPage() {
  const [errorMessage, dispatch] = useFormState(register, { message: "", status: 0 })

  return (
    <div className='w-screen h-screen grid place-items-center'>
      <main className='py-7 px-5 bg-white min-w-[400px] shadow-lg'>
        <div className='text-center mb-4'>
          <h1 className='text-gradient text-2xl w-fit m-auto' >MigoW</h1>
          <div className='w-24 h-[2px] bg-gray-500 m-auto my-2' />
          <p className='text-gray-500 font-semibold'>Register</p>
        </div>
        <form action={dispatch} className='flex flex-col gap-1'>

          {
            [
              {
                label: "Email",
                type: "email"
              },
              {
                label: "Name",
              },
              {
                label: "Surname",
              },
              {
                label: "Username",
              },
              {
                label: "Password",
                type: "password"
              },
            ].map(data => (
              <React.Fragment key={data.label}>
                <label htmlFor={data.label + "-input"} className='text-gray-500'>
                  {data.label}
                </label>
                <input id={data.label + "-input"} className='border-2 border-gray-400 p-2 outline-none rounded-md' name={data.label.toLowerCase()} type={data.type || "text"} required />
              </React.Fragment>
            ))
          }

          {errorMessage?.message && <p className='text-red-700 text-sm font-semibold'>{errorMessage.message}</p>}
          <Link className='text-center' href="/login">you have a account? login</Link>
          <SubmitButton />
        </form>
      </main>
    </div>
  );
}