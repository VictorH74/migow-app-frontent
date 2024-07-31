"use client"
import React from 'react';
import usePostCard, { PostCardProps } from "./usePostCard"
import Image from 'next/image';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import { SxProps } from '@mui/material';
import CardContainer from '@/components/CardContainer';
import CardHeader from '@/components/CardContainer/CardHeader';
import CommentList from './CommentList';
import { twMerge } from 'tailwind-merge';
import IconButton from '../IconButton';
import LoadingLazyComponent from '../LoadingLazyComponent';
import CreateCommentInput from './CommentList/components/CreateCommentInput';
import ReactionEmojiListWapper from '../ReactionEmojiListWapper';


const ReactionUserListModal = React.lazy(() => import('../ReactionUserListModal'))


export default function PostCard({ showBottomActions = true, showBottomInf = true, ...props }: PostCardProps) {
  const hook = usePostCard(props);

  const avatarSxProps: SxProps = props.sharedPost ? {
    fontSize: 10,
    width: 25,
    height: 25,
  } : {}

  return (
    <li className='w-[700px]'>
      <CardContainer
        className={`${props.fromPost ? "max-w-[700px] mx-auto" : " max-w-[780px]"} ${props.fromActivity ? "shadow-none" : ""}`}
      >
        {!props.fromActivity && (
          <CardHeader
            {...{ avatarSxProps }}
            avatarImage={props.owner.profileImageUrl || props.owner.name}
            heading={props.owner.username}
            headingClassName={twMerge("font-semibold", props.sharedPost ? "text-sm" : "")}
            href={"/in/profile/" + props.owner.username}
            showDate={!props.sharedPost}
            ISODate={props.createdAt}
            showMenuButton={!props.sharedPost}
            menuItemObjs={[
              {
                label: "Follow user",
                onClick: () => { }
              },
              {
                label: "Report post",
                onClick: () => { }
              },
            ]}
            leftComponents={
              props.sharedPost && (<p className='ml-2'>shared the {props.sharedPost.owner.username}&apos;s post</p>)
            }
          />
        )}

        <div className='flex flex-col gap-2'>
          <p className='px-4'>{props.text}</p>

          {props.mediaURLs && !props.sharedPost && (
            <Image width={780} height={300} className='h-fit w-fit m-auto max-h-[700px]' src={props.mediaURLs[0].src.toString()} alt='post midia' />
          )}

          {props.sharedPost && !props.mediaURLs && (
            <>
              <div className='bg-gray-500 h-[1px] mx-4' />
              <PostCard
                {...props.sharedPost}
                fromPost
                showBottomActions={!props.text}
                showBottomInf={!props.text}
              />
            </>
          )}

          <div className='bg-gray-500 h-[1px] mx-4' />

          {(showBottomActions || (!!props.sharedPost && !!props.text)) && (
            <div className='flex justify-center gap-4 px-4 mt-2'>
              {
                [
                  {
                    Icon: AddReactionIcon,
                    count: props.reactCount,
                    countBtnOnClick: () => hook.setShowReactionUsersModal(true),
                    countBtnDisabled: props.reactCount === 0,
                    onClick: hook.createDeleteReaction,
                    label: "Add Reaction",
                    buttonLabelSegment: "reactions"
                  },
                  {
                    Icon: AddCommentIcon,
                    count: props.commentCount,
                    countBtnOnClick: () => hook.setShowComments(true),
                    countBtnDisabled: props.commentCount === 0 || hook.comments.length !== 0,
                    onClick: () => hook.setShowComments(true),
                    label: "Add Comment",
                    buttonLabelSegment: "comments"
                  },
                  {
                    Icon: ShareIcon,
                    count: props.shareCount,
                    countBtnOnClick: () => { },
                    countBtnDisabled: true,
                    onClick: () => { },
                    label: "Share",
                    buttonLabelSegment: "shares"
                  },
                ].map(btnData => (
                  <div className='' key={btnData.label} >
                    {btnData.label === "Add Reaction" ? (
                      <ReactionEmojiListWapper onEmojiClick={hook.createUpdateReaction} >
                        <IconButton
                          Icon={btnData.Icon}
                          onClick={btnData.onClick}
                          label={btnData.label}
                          labelClassName='font-semibold'
                          direction='horizontal'
                          isActive={!!props.currentUserReaction}
                        />
                      </ReactionEmojiListWapper>
                    ) : (
                      <IconButton

                        Icon={btnData.Icon}
                        onClick={btnData.onClick}
                        label={btnData.label}
                        labelClassName='font-semibold'
                        direction='horizontal'
                      />
                    )}
                    <button
                      className='text-sm font-semibold text-center text-gray-600 hover:underline w-full'
                      disabled={btnData.countBtnDisabled}
                      onClick={btnData.countBtnOnClick}
                    >
                      {btnData.count} {btnData.buttonLabelSegment}
                    </button>
                  </div>
                ))
              }
            </div>
          )}

          <div className='px-4'>
            <CreateCommentInput avatarSxProps={{ marginTop: 0.3 }} containerClassname='mb-2' newCommentFunc={hook.addNewComment} />
            {hook.showComments && (
              <CommentList
                postId={props.id}
                commentCount={props.commentCount}
                comments={hook.comments}
                highlightReplyComment={props.highlightReplyComment}
                loadComments={hook.loadMoreComments}
              />
            )}
          </div>




        </div>
        <React.Suspense fallback={<LoadingLazyComponent />}>
          {hook.showReactionUsersModal && (
            <ReactionUserListModal
              target={`post_${props.id}`}
              reactionTypeCounts={props.reactionTypeCounts}
              onClose={() => hook.setShowReactionUsersModal(false)}
            />
          )}
        </React.Suspense>
      </CardContainer>
    </li>
  );
}
