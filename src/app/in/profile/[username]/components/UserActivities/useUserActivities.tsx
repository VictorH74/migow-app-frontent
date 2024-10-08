import { UserEventEnum } from '@/enums';
import useMessageSegment from '@/hooks/useMessageSegment';
import { ActivityInterface } from '@/interfaces/Activity';
import { ResponsePageInterface } from '@/interfaces/ResponsePage';
import { UserInterface } from '@/interfaces/User';
import { serverFetch } from '@/lib/actions';
// import { activitiesMock } from '@/mockData';
import React from 'react';

export interface UserActivitiesProps {
    ownerUser: UserInterface.ProfileType;
}

type ActivityQuery = 'all' | 'posts' | 'comments' | 'reactions';

const isEventRelatedWithPost = (event: UserEventEnum) =>
    [UserEventEnum.SHARE_POST, UserEventEnum.NEW_POST].includes(event);
const isEventRelatedWithComment = (event: UserEventEnum) =>
    [UserEventEnum.COMMENT_POST, UserEventEnum.REPLY_COMMENT].includes(event);

// const getFilteredData: Record<
//     ActivityQuery,
//     (userId: UserInterface['id']) => ActivityInterface[]
// > = {
//     all: (userId: string) => activitiesMock,
//     posts: (userId: string) =>
//         activitiesMock.filter(
//             (a) => a.user.id === userId && isEventRelatedWithPost(a.userEvent)
//         ),
//     comments: (userId: string) =>
//         activitiesMock.filter(
//             (a) =>
//                 a.user.id === userId && isEventRelatedWithComment(a.userEvent)
//         ),
//     reactions: (userId: string) => activitiesMock,
// };

const activitySegment: Record<UserEventEnum, string> = {
    '1': `posted this`,
    '2': 'commented this',
    '3': `replied a comment`,
    '4': `reacted a comment`,
    '5': `reacted this`,
    '6': `reacted a reply comment`,
    '7': `reposted this`,
};

export default function useUserActivities(props: UserActivitiesProps) {
    const allBtnRef = React.useRef<HTMLButtonElement | null>(null);
    const postsBtnRef = React.useRef<HTMLButtonElement | null>(null);
    const commentsBtnRef = React.useRef<HTMLButtonElement | null>(null);
    const reactionsBtnRef = React.useRef<HTMLButtonElement | null>(null);

    const getActivityMsgSegment = useMessageSegment(activitySegment, '');

    const [activityQuery, setActivityQuery] = React.useState<
        'all' | 'posts' | 'comments' | 'reactions'
    >('all');
    const [activities, setActivities] = React.useState<ActivityInterface[]>([]);

    const btnData = React.useMemo(
        () => [
            {
                ref: allBtnRef,
                label: 'All',
                selected: activityQuery === 'all',
                onClick: () => setActivityQuery('all'),
            },
            {
                ref: postsBtnRef,
                label: 'Posts',
                selected: activityQuery === 'posts',
                onClick: () => setActivityQuery('posts'),
            },
            {
                ref: commentsBtnRef,
                label: 'Comments',
                selected: activityQuery === 'comments',
                onClick: () => setActivityQuery('comments'),
            },
            {
                ref: reactionsBtnRef,
                label: 'Reactions',
                selected: activityQuery === 'reactions',
                onClick: () => setActivityQuery('reactions'),
            },
        ],
        [activityQuery]
    );

    React.useEffect(() => {
        // TODO: fetch user activities in date order while display loading

        (async () => {
            const activities = await serverFetch<
                ResponsePageInterface<ActivityInterface>
            >('/ue-s/user-activities');

            if (!activities) {
                alert('activities not found');
                return;
            }

            setActivities(activities.content);
            // const data = await clientHTTP.getUserActivities(
            //     props.userId,
            //     activityQuery
            // );
        })();
        // const data = getFilteredData[activityQuery](props.ownerUser.id);
        // setActivities(
        //     data.toSorted((a, b) => {
        //         return (
        //             new Date(b.createdAt).getTime() -
        //             new Date(a.createdAt).getTime()
        //         );
        //     })
        // );
    }, [activityQuery, props.ownerUser]);

    return {
        btnData,
        activityQuery,
        activities,
        getActivityMsgSegment,
        isEventRelatedWithPost,
        isEventRelatedWithComment,
    };
}
