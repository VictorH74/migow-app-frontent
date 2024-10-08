import { NewPostCtx } from '@/contexts/NewPostProvider';
import React from 'react';

export default function useNewPost() {
    const ctx = React.use(NewPostCtx);

    if (!ctx) throw Error('useNewPost must be into a NewPostProvider');

    return ctx;
}
