import { postArrayCtx } from '@/contexts/PostListProvider';
import { use } from 'react';

export default function usePostArray() {
    const ctx = use(postArrayCtx);

    if (!ctx) throw new Error('usePostArray must be into a PostArrayProvider');

    return ctx;
}
