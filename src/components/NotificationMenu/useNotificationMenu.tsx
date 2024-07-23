"use client"
import { UserEventEnum } from '@/enums';
import useMessageSegment from '@/hooks/useMessageSegment';
import usePopup from '@/hooks/usePopup';
import { NotificationInterface } from '@/interfaces/Notification';
import { notificationsMock } from '@/mockData';
import React from 'react';

export interface NotificationMenuProps {
  popup: ReturnType<typeof usePopup>
}

const notificationSegment: Record<UserEventEnum, string> = {
  1: `replied to {{finalUserName}}'s comment`,
  2: "posted something",
  3: `commented on {{finalUserName}}'s post`,
  4: `reacted to {{finalUserName}}'s comment`,
  5: `reacted to {{finalUserName}}'s post`,
  6: `shared {{finalUserName}}'s post`
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