import { ChatboxListCtx } from '@/contexts/ChatboxListProvider';
import { use } from 'react';

export const useChatboxList = () => {
    const ctx = use(ChatboxListCtx);
    if (!ctx)
        throw new Error('useChatboxList must be into a ChatboxListProvider');

    return ctx;
};
