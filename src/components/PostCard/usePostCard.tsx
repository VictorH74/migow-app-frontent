import { ActivityInterface } from '@/interfaces/Activity';
import { CommentInterface } from '@/interfaces/Comment';
import { PostInterface } from '@/interfaces/Post';
import React from 'react';

export interface PostCardProps {
    fromPost?: boolean;
    showBottomActions?: boolean;
    showBottomInf?: boolean;
    highlightComment?: CommentInterface;
    highlightReplyComment?: ActivityInterface['replyComment'] | undefined;
    fromActivity?: boolean;
    post: PostInterface;
}

export default function usePostCard() {
    const [showReactionUsersModal, setShowReactionUsersModal] =
        React.useState(false);
    const [showComments, setShowComments] = React.useState(false);

    return {
        showReactionUsersModal,
        setShowReactionUsersModal,
        showComments,
        setShowComments,
    };
}
