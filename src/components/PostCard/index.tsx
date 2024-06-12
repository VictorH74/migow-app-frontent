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
import PostBottomInf from './PostBottomInf';
import { twMerge } from 'tailwind-merge';


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

        {(showBottomInf || (!!props.sharedPost && !!props.text)) && (
          <>
            <PostBottomInf
              recoveredAllComments={hook.recoveredAllComments}
              reactionCount={props.reactionCount}
              commentCount={props.commentCount}
              shareCount={props.shareCount}
              loadComments={hook.loadComments}
            />
            <div className='bg-gray-500 h-[1px] mx-4' />
          </>
        )}

        {(showBottomActions || (!!props.sharedPost && !!props.text)) && (
          <div className='flex justify-center gap-1 px-4 mt-2'>
            {
              [
                {
                  Icon: AddReactionIcon,
                  onClick: () => { },
                  label: "Add Reaction"
                },
                {
                  Icon: AddCommentIcon,
                  onClick: () => { },
                  label: "Add Comment"
                },
                {
                  Icon: ShareIcon,
                  onClick: () => { },
                  label: "Share"
                },
              ].map(btnData => (
                <button key={btnData.label} className='flex gap-2 items-center text-gray-600 font-semibold hover:bg-gray-200 duration-200 px-5 py-2 rounded' >
                  <btnData.Icon className='text-3xl' />
                  <span>{btnData.label}</span>
                </button>
              ))
            }
          </div>
        )}

        <CommentList
          commentCount={props.commentCount}
          comments={hook.comments}
          highlightReplayComment={props.highlightReplayComment}
          loadComments={hook.loadComments}
        />

      </div>
    </CardContainer>
  );
}