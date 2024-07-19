import React from 'react';
import PostCard from '@/components/PostCard';
import { postsMock } from '@/mockData';
import { PostInterface } from '@/interfaces';
import { cookies } from 'next/headers';
import { PageResponse } from '@/types';


export default async function PostsPage() {
  // TODO: decrypt the token to get the current user id
  const ownerToken = cookies().get("currentUser");
  // e.g.:
  // const currentUser = jwt.decript(ownerToken) as { id: string }
  const currentUser = { id: "9bca54b4-6cfe-4f76-8a11-def9c829e627" }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/p-s/posts/${currentUser.id}/recent`)
  const page = (await res.json()) as PageResponse<PostInterface>

  return (
    <div className='mt-2'>
      <main className='flex flex-col gap-2 items-center'>
        {page.content.map(post => (<PostCard key={post.id} {...post} />))}
      </main>
    </div>
  );
}