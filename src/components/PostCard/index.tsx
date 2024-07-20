"use client"
import React, { use } from 'react';
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


export default function PostCard({ showBottomActions = true, showBottomInf = true, ...props }: PostCardProps) {
  const hook = usePostCard(props);

  const avatarSxProps: SxProps = props.sharedPost ? {
    fontSize: 10,
    width: 25,
    height: 25,
  } : {}

  return (
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
                  onClick: () => { },
                  label: "Add Reaction",
                  buttonLabelSegment: "reactions"
                },
                {
                  Icon: AddCommentIcon,
                  count: props.commentCount,
                  onClick: hook.loadComments,
                  label: "Add Comment",
                  buttonLabelSegment: "comments"
                },
                {
                  Icon: ShareIcon,
                  count: props.shareCount,
                  onClick: () => { },
                  label: "Share",
                  buttonLabelSegment: "shares"
                },
              ].map(btnData => (
                <div className='' key={btnData.label} >
                  <IconButton

                    Icon={btnData.Icon}
                    onClick={btnData.onClick}
                    label={btnData.label}
                    labelClassName='font-semibold'
                    direction='horizontal'
                  />
                  <button
                    className='text-sm font-semibold text-center text-gray-600 hover:underline w-full'
                    disabled={btnData.count === 0}
                  >
                    {btnData.count} {btnData.buttonLabelSegment}
                  </button>
                </div>
              ))
            }
          </div>
        )}

        {props.commentCount > 0 && hook.comments.length === 0 && (
          <CommentList
            commentCount={props.commentCount}
            comments={hook.comments}
            highlightReplayComment={props.highlightReplayComment}
            loadComments={hook.loadComments}
          />
        )}



      </div>
    </CardContainer>
  );
}