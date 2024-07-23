'use client'
import React from 'react';
import useUserActivities, { UserActivitiesProps } from "./useUserActivities"
import CardContainer from '@/components/CardContainer';
import CardHeader from '@/components/CardContainer/CardHeader';
import PostCard from '@/components/PostCard';
import { UserEventEnum } from '@/enums';
import SymetricHorizontalButtonList from '@/components/SymetricHorizontalButtonList';


export default function UserActivities(props: UserActivitiesProps) {
  const hook = useUserActivities(props);

  return (
    <div>
      <div className='flex justify-between mb-9'>
        <h2>
          Activities
        </h2>
        <SymetricHorizontalButtonList btnData={hook.btnData} />
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