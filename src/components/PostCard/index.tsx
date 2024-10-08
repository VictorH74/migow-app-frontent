'use client';
import React from 'react';
import usePostCard, { PostCardProps } from './usePostCard';
import Image from 'next/image';
import { SxProps } from '@mui/material';
import CardContainer from '@/components/CardContainer';
import CardHeader from '@/components/CardContainer/CardHeader';
import CommentList from './CommentList';
import { twMerge } from 'tailwind-merge';
import LoadingLazyComponent from '../LoadingLazyComponent';
import PostProvider from '@/contexts/PostProvider';
import PostBottomButtons from './PostBottomButtons';
import FileSlide from '../FileSlide';

const ReactionUserListModal = React.lazy(
    () => import('../ReactionUserListModal')
);

export default function PostCard({
    showBottomActions = true,
    showBottomInf = true,
    post,
    ...props
}: PostCardProps) {
    const hook = usePostCard();

    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    const avatarSxProps: SxProps =
        post.sharedPost != null
            ? {
                  fontSize: 10,
                  width: 25,
                  height: 25,
              }
            : {};

    return (
        <PostProvider {...post}>
            <li className="w-[700px] list-none">
                <CardContainer
                    className={`shadow-none ${
                        props.fromPost
                            ? 'max-w-[700px] mx-auto'
                            : ' max-w-[780px]'
                    }`}
                >
                    {!props.fromActivity && (
                        <CardHeader
                            {...{ avatarSxProps }}
                            avatarImage={
                                post.owner.profileImageUrl || post.owner.name
                            }
                            heading={post.owner.username}
                            headingClassName={twMerge(
                                'font-semibold',
                                post.sharedPost != null ? 'text-sm' : ''
                            )}
                            href={'/in/profile/' + post.owner.username}
                            showDate={post.sharedPost == null}
                            ISODate={post.createdAt}
                            showMenuButton={post.sharedPost == null}
                            menuItemObjs={[
                                {
                                    label: 'Follow user',
                                    onClick: () => {},
                                },
                                {
                                    label: 'Report post',
                                    onClick: () => {},
                                },
                            ]}
                            leftComponents={
                                post.sharedPost != null && (
                                    <p className="ml-2">
                                        shared the{' '}
                                        {post.sharedPost.owner.username}&apos;s
                                        post
                                    </p>
                                )
                            }
                        />
                    )}

                    <div className="flex flex-col gap-2">
                        <p className="px-4">{post.text}</p>

                        {/* TODO: use FileSlide */}
                        {post.mediaList &&
                            post.mediaList.length > 0 &&
                            post.sharedPost == null && (
                                <FileSlide files={post.mediaList} />
                                // <Image width={780} height={300} className='h-fit w-fit m-auto max-h-[700px]' src={post.mediaList[0].url} alt='post midia' />
                            )}

                        {post.sharedPost != null &&
                            (!post.mediaList || post.mediaList.length == 0) && (
                                <>
                                    <div className="bg-gray-500 h-[1px] mx-4" />
                                    <PostCard
                                        fromPost
                                        post={post.sharedPost}
                                        showBottomActions={!post.text}
                                        showBottomInf={!post.text}
                                    />
                                </>
                            )}

                        {((post.mediaList && post.mediaList.length > 0) ||
                            !!post.sharedPost) && (
                            <div className="bg-gray-500 h-[1px] mx-4" />
                        )}

                        {(showBottomActions ||
                            (post.sharedPost != null && !!post.text)) && (
                            <PostBottomButtons
                                post={post}
                                currentPostUserReaction={
                                    post.currentUserReaction
                                }
                                handleAddComment={() => {
                                    textAreaRef.current?.focus();
                                }}
                                postCommentCount={post.commentCount}
                                postReactCount={post.reactCount}
                                postShareCount={post.shareCount}
                                setShowComments={hook.setShowComments}
                                setShowReactionUsersModal={
                                    hook.setShowReactionUsersModal
                                }
                            />
                        )}

                        <div className="px-4">
                            <CommentList
                                ref={textAreaRef}
                                postFromPost={props.fromPost}
                                postId={post.id}
                                commentCount={post.commentCount}
                                highlightComment={props.highlightComment}
                                showComments={hook.showComments}
                                highlightReplyComment={
                                    props.highlightReplyComment
                                }
                            />
                        </div>
                    </div>
                    <React.Suspense fallback={<LoadingLazyComponent />}>
                        {hook.showReactionUsersModal && (
                            <ReactionUserListModal
                                target={`post_${post.id}`}
                                reactionCountByType={post.reactionCountByType}
                                onClose={() =>
                                    hook.setShowReactionUsersModal(false)
                                }
                            />
                        )}
                    </React.Suspense>
                </CardContainer>
            </li>
        </PostProvider>
    );
}
