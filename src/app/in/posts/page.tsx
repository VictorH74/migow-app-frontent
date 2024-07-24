"use client"
import React from 'react';
import usePostArray from '@/hooks/usePostArray';
import PostCard from '@/components/PostCard';

// TODO: posts list infinity scroll
export default function PostsPage() {
  const { posts } = usePostArray();

  return (
    <div className='mt-2'>
      <main>
        <ul className='flex flex-col gap-2 items-center'>
            {posts.map(post => (<PostCard key={post.id} {...post} />))}
        </ul>
      </main>
    </div>
  );
}