"use client"
import { UserEventEnum } from '@/enums';
import useMessageSegment from '@/hooks/useMessageSegment';
import usePopup from '@/hooks/usePopup';
import { NotificationInterface } from '@/interfaces';
import { notificationsMock } from '@/mockData';
import React from 'react';

export interface NotificationMenuProps {
  popup: ReturnType<typeof usePopup>
}

const notificationSegment: Record<UserEventEnum, string> = {
  0: `replied to {{finalUserName}}'s comment`,
  1: "posted something",
  2: `commented on {{finalUserName}}'s post`,
  3: `reacted to {{finalUserName}}'s comment`,
  4: `reacted to {{finalUserName}}'s post`,
  5: `shared {{finalUserName}}'s post`
}

export default function useNotificationMenu({ popup }: NotificationMenuProps) {
  const [loading, setLoading] = React.useState(true);
  const [notifications, setNotifications] = React.useState<NotificationInterface[]>([]);

  const getNotificationSegment = useMessageSegment(notificationSegment, "{{finalUserName}}")

  React.useEffect(() => {
    if (popup.open) {
      (async () => {
        // TODO: fetch owner notifications
        // temp
        const data = await new Promise<NotificationInterface[]>((res) => {
          setTimeout(() => res(notificationsMock), 1000)
        })
        setNotifications(data)
        setLoading(false)
      })()
    } else {
      setTimeout(() => setLoading(true), 500)
    }
  }, [popup.open])

  return { loading, notifications, getNotificationSegment }
}