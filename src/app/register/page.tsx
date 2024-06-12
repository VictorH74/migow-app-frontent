import Link from 'next/link';
import React from 'react';

export default function RegisterPage() {
  return (
    <div className='w-screen h-screen grid place-items-center'>
      <main className='py-7 px-5 bg-white min-w-[400px] shadow-lg'>
        <div className='text-center mb-4'>
          <h1 className='text-gradient text-2xl w-fit m-auto' >MigoW</h1>
          <div className='w-24 h-[2px] bg-gray-500 m-auto my-2' />
          <p className='text-gray-500 font-semibold'>Register</p>
        </div>
        <form action="" className='flex flex-col gap-1'>

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
                <input id={data.label + "-input"} className='border-2 border-gray-400 p-2 outline-none rounded-md' type={data.type || "text"} />
              </React.Fragment>
            ))
          }


          <Link className='text-center' href="/login">you have a account? login</Link>
          <button className='bg-gradient p-2 rounded-md text-white mt-2 hover:brightness-110 duration-150' type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}