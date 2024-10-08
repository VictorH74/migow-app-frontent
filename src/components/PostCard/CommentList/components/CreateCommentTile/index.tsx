'use client';
import usePost from '@/hooks/usePost';
import { SxProps } from '@mui/material';
import React from 'react';
import CreateCommentInput from '../CreateCommentInput';

interface CreateCommentTileProps {
    containerClassname?: string;
    avatarSxProps?: SxProps;
}

export default React.memo(
    React.forwardRef<HTMLTextAreaElement, CreateCommentTileProps>(
        function CreateCommentTile(props: CreateCommentTileProps, ref) {
            const { createComment } = usePost();
            const handleSubmit = async (content: string) =>
                createComment(content);

            return (
                <CreateCommentInput
                    ref={ref}
                    onSubmit={handleSubmit}
                    avatarSxProps={props.avatarSxProps}
                    containerClassname={props.containerClassname}
                />
            );
        }
    )
);
