'use client'
import React from 'react';
import useUserActivities, { UserActivitiesProps } from "./useUserActivities"
import CardContainer from '@/components/CardContainer';
import CardHeader from '@/components/CardContainer/components/CardHeader';
import PostCard from '@/components/PostCard';
import { UserEventEnum } from '@/enums';
import { twMerge } from 'tailwind-merge';



export default function UserActivities(props: UserActivitiesProps) {
  const hook = useUserActivities(props);

  return (
    <div>
      <div className='flex justify-between mb-9'>
        <h2>
          Activities
        </h2>
        <div className='flex gap-1 overflow-hidden rounded-2xl'>
          {hook.btnData.map(btn => (
            <button
              key={btn.label}
              ref={btn.ref}
              onClick={btn.onClick}
              className={twMerge('p-2 bg-gray-500 text-white opacity-0 duration-200  hover:bg-gray-400', btn.selected ? "bg-gray-400" : "")}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {hook.activities.map(a => (
          <CardContainer key={a.id} className='max-w-[780px] mx-auto my-2' >
            <CardHeader
              className='px-0'
              heading={a.user.username}
              headingClassName='ml-4 font-semibold'
              leftComponents={
                <p className='ml-2'>{hook.getActivityMsgSegment(a.userEvent.toString())}</p>
              }
            />

            {
              hook.isEventRelatedWithPost(a.userEvent) && (
                <PostCard {...a.post} fromActivity />
              )
            }

            {
              UserEventEnum.COMMENT_POST === a.userEvent && (
                <PostCard {...a.post} highlightComment={a.comment!} fromActivity />
              )
            }

            {
              UserEventEnum.COMMENT_REPLAY === a.userEvent && (
                <PostCard {...a.post} highlightReplayComment={a.commentReply!} fromActivity />
              )
            }

          </CardContainer>
        ))}
      </div>
    </div>
  );
}