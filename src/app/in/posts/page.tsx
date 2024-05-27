import React from 'react';
import PostCard from '@/components/PostCard';
import { postsMock } from '@/mockData';


export default function PostsPage() {
  return (
    <div className='mt-2'>
      <main className='flex flex-col gap-2 items-center'>
        {postsMock.map(post => (<PostCard key={post.id} {...post} />))}
      </main>
    </div>
  );
}