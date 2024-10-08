'use client';
import React from 'react';
import useUserActivities, { UserActivitiesProps } from './useUserActivities';
import CardContainer from '@/components/CardContainer';
import CardHeader from '@/components/CardContainer/CardHeader';
import PostCard from '@/components/PostCard';
import { UserEventEnum } from '@/enums';
import SymetricHorizontalButtonList from '@/components/SymetricHorizontalButtonList';

export default function UserActivities(props: UserActivitiesProps) {
    const hook = useUserActivities(props);

    return (
        <div>
            <div className="flex justify-between mb-9">
                <h2>Activities</h2>
                <SymetricHorizontalButtonList btnData={hook.btnData} />
            </div>

            <div>
                {hook.activities.map((a) => (
                    <CardContainer key={a.id} className="w-fit mx-auto my-2">
                        <CardHeader
                            className="px-0"
                            heading={props.ownerUser.username}
                            headingClassName="ml-4 font-semibold"
                            leftComponents={
                                <p className="ml-2">
                                    {hook.getActivityMsgSegment(
                                        a.userEventCode.toString()
                                    )}
                                </p>
                            }
                        />

                        <PostCard
                            post={a.post}
                            fromActivity
                            {...(hook.isEventRelatedWithPost(a.userEventCode) //
                                ? {}
                                : UserEventEnum.COMMENT_POST === a.userEventCode
                                ? { highlightComment: a.comment! }
                                : UserEventEnum.REPLY_COMMENT ===
                                  a.userEventCode
                                ? { highlightReplyComment: a.replyComment! }
                                : {})}
                        />
                    </CardContainer>
                ))}
            </div>
        </div>
    );
}
