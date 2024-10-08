'use client';

import { ChatboxListProvider } from '@/contexts/ChatboxListProvider';
import { NewPostProvider } from '@/contexts/NewPostProvider';
import { PostListProvider } from '@/contexts/PostListProvider';
import React from 'react';

export default function Providers(props: React.PropsWithChildren) {
    return (
        <PostListProvider>
            <NewPostProvider>
                <ChatboxListProvider>{props.children}</ChatboxListProvider>
            </NewPostProvider>
        </PostListProvider>
    );
}
