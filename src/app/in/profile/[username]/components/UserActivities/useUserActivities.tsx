import { UserEventEnum } from '@/enums';
import useMessageSegment from '@/hooks/useMessageSegment';
import { ActivityInterface } from '@/interfaces';
import { activitiesMock } from '@/mockData';
import React from 'react';

export interface UserActivitiesProps {
  userId: string
}

type ActivityQuery = "all" | "posts" | "comments" | "reactions";

const isEventRelatedWithPost = (event: UserEventEnum) => [UserEventEnum.SHARE_POST, UserEventEnum.NEW_POST]
  .includes(event)
const isEventRelatedWithComment = (event: UserEventEnum) => [UserEventEnum.COMMENT_POST, UserEventEnum.COMMENT_REPLAY]
  .includes(event)

const getFilteredData: Record<ActivityQuery, (userId: string) => ActivityInterface[]> = {
  "all": (userId: string) => activitiesMock,
  "posts": (userId: string) => activitiesMock.filter(a =>
    a.user.id === userId && isEventRelatedWithPost(a.userEvent)
  ),
  "comments": (userId: string) => activitiesMock.filter(a =>
    a.user.id === userId && isEventRelatedWithComment(a.userEvent)
  ),
  "reactions": (userId: string) => activitiesMock,
}

const activitySegment: Record<UserEventEnum, string> = {
  0: `replied this`,
  1: "posted this",
  2: `commented this`,
  3: `reacted this`,
  4: `reacted this`,
  5: `shared this`
}

export default function useUserActivities(props: UserActivitiesProps) {
  const allBtnRef = React.useRef<HTMLButtonElement | null>(null)
  const postsBtnRef = React.useRef<HTMLButtonElement | null>(null)
  const commentsBtnRef = React.useRef<HTMLButtonElement | null>(null)
  const reactionsBtnRef = React.useRef<HTMLButtonElement | null>(null)

  const getActivityMsgSegment = useMessageSegment(activitySegment, "")

  const [activityQuery, setActivityQuery] = React.useState<"all" | "posts" | "comments" | "reactions">("all");
  const [activities, setActivities] = React.useState<ActivityInterface[]>([])

  const btnData = React.useMemo(() => [
    {
      ref: allBtnRef,
      label: "All",
      selected: activityQuery === "all",
      onClick: () => setActivityQuery("all")
    },
    {
      ref: postsBtnRef,
      label: "Posts",
      selected: activityQuery === "posts",
      onClick: () => setActivityQuery("posts")
    },
    {
      ref: commentsBtnRef,
      label: "Comments",
      selected: activityQuery === "comments",
      onClick: () => setActivityQuery("comments")
    },
    {
      ref: reactionsBtnRef,
      label: "Reactions",
      selected: activityQuery === "reactions",
      onClick: () => setActivityQuery("reactions")
    },
  ], [activityQuery])

  React.useEffect(() => {
    const refs = [allBtnRef, postsBtnRef, commentsBtnRef, reactionsBtnRef]

    if (refs.every(ref => !!ref.current)) {
      const btnWidths = refs.map(r => r.current!.getBoundingClientRect().width)
      const maxWidth = Math.max(...btnWidths)

      let index = 0
      for (const ref of refs) {
        ref.current!.style.width = maxWidth + "px"
        setTimeout(() => {
          ref.current!.style.opacity = "1"
        }, index * 80)
        index++
      }
    }
  }, [btnData])

  React.useEffect(() => {
    // TODO: fetch user activities in date order while display loading
    // WITH CLIENTHTTP
    /*
    (async () => {
      const data = await clientHTTP.getUserActivities(props.userId, activityQuery)
    })()
    */
    const data = getFilteredData[activityQuery](props.userId)
    setActivities(data.toSorted((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }))
  }, [activityQuery, props.userId])

  return {
    btnData,
    activityQuery,
    activities,
    getActivityMsgSegment,
    isEventRelatedWithPost,
    isEventRelatedWithComment,
  }
}