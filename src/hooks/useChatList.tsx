import { ChatListCtx } from '@/contexts/ChatListProvider';
import { use } from 'react';

export default function useChatList() {
    const ctx = use(ChatListCtx);
    if (!ctx) throw new Error('useChatList must be into a ChatListProvider');
    return ctx;
}
