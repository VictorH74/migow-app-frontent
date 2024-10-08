import IconButton from '@/components/IconButton';
import ReactionEmojiListWapper from '@/components/ReactionEmojiListWapper';
import usePost from '@/hooks/usePost';
import React from 'react';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import { ReactionInterface } from '@/interfaces/Reaction';
import useNewPost from '@/hooks/useNewPost';
import { PostInterface } from '@/interfaces/Post';

interface PostBottomButtonsProps {
    post: PostInterface;
    currentPostUserReaction?: ReactionInterface.SimpleType;
    postReactCount: number;
    postCommentCount: number;
    postShareCount: number;
    setShowReactionUsersModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
    handleAddComment(): void;
}

export default function PostBottomButtons(props: PostBottomButtonsProps) {
    const { comments, createUpdateReaction, createDeleteReaction } = usePost();
    const { setSharedPost } = useNewPost();

    return (
        <div className="flex justify-center gap-4 px-4 mt-2">
            {[
                {
                    Icon: AddReactionIcon,
                    count: props.postReactCount,
                    countBtnOnClick: () =>
                        props.setShowReactionUsersModal(true),
                    countBtnDisabled: props.postReactCount === 0,
                    onClick: createDeleteReaction,
                    label: 'Add Reaction',
                    buttonLabelSegment: 'reactions',
                },
                {
                    Icon: AddCommentIcon,
                    count: props.postCommentCount,
                    countBtnOnClick: () => props.setShowComments(true),
                    countBtnDisabled:
                        props.postCommentCount === 0 || comments.length !== 0,
                    onClick: () => {
                        props.setShowComments(() => true);
                        props.handleAddComment();
                    },
                    label: 'Add Comment',
                    buttonLabelSegment: 'comments',
                },
                {
                    Icon: ShareIcon,
                    count: props.postShareCount,
                    countBtnOnClick: () => {},
                    countBtnDisabled: true,
                    onClick: () => setSharedPost(props.post),
                    label: 'Share',
                    buttonLabelSegment: 'shares',
                },
            ].map((btnData) => (
                <div className="" key={btnData.label}>
                    {btnData.label === 'Add Reaction' ? (
                        <ReactionEmojiListWapper
                            onEmojiClick={createUpdateReaction}
                        >
                            <IconButton
                                Icon={btnData.Icon}
                                onClick={btnData.onClick}
                                label={btnData.label}
                                labelClassName="font-semibold"
                                direction="horizontal"
                                isActive={!!props.currentPostUserReaction}
                            />
                        </ReactionEmojiListWapper>
                    ) : (
                        <IconButton
                            Icon={btnData.Icon}
                            onClick={btnData.onClick}
                            label={btnData.label}
                            labelClassName="font-semibold"
                            direction="horizontal"
                        />
                    )}
                    <button
                        className="text-sm font-semibold text-center text-gray-600 hover:underline w-full"
                        disabled={btnData.countBtnDisabled}
                        onClick={btnData.countBtnOnClick}
                    >
                        {btnData.count} {btnData.buttonLabelSegment}
                    </button>
                </div>
            ))}
        </div>
    );
}
