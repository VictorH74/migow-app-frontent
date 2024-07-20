"use client"

import React from 'react';
import PostCard from '@/components/PostCard';
import { PostInterface } from '@/interfaces';
import useClientHTTP from '@/hooks/useClientHTTP';
import { GetAllPostFilterType } from '@/types';

// TODO: posts list infinity scroll
export default function PostsPage() {
  const clientHTTP = useClientHTTP();
  const [posts, setPosts] = React.useState<PostInterface[]>([])
  const [pageNumber, setPageNumber] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(10)
  const [filter, setFilter] = React.useState<GetAllPostFilterType>("recent")

  const loadMorePost = async () => {
    clientHTTP.getAllFriendPost("{tokenUserId}", filter, pageNumber).then(page => {
      setPosts(prev => [...prev, ...page.content])
      setPageNumber(prev => prev + 1)
    })
  }

  React.useEffect(() => {
    clientHTTP.getAllFriendPost("{tokenUserId}", filter).then(page => {
      setPosts(page.content)
      setPageNumber(page.pageable.pageNumber)
      setPageSize(page.pageable.pageSize)
    })
  }, [filter, clientHTTP])

  return (
    <div className='mt-2'>
      <main className='flex flex-col gap-2 items-center'>
        {posts.map(post => (<PostCard key={post.id} {...post} />))}
      </main>
    </div>
  );
}