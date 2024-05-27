/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import PeopleIcon from '@mui/icons-material/People';
import { usePathname, useRouter } from 'next/navigation';

export default function useHeader() {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (name: string) => pathname === name;

  const navButtons = React.useMemo(() => [
    {
      Icon: AddIcon,
      label: "Add Post",
      onClick: () => { },
    },
    {
      Icon: HomeIcon,
      label: "Home",
      onClick: () => router.replace("/in/posts"),
      isActive: isActive("/in/posts")
    },
    {
      Icon: PeopleIcon,
      label: "Peoples",
      onClick: () => { },
    },
    {
      Icon: ModeCommentIcon,
      label: "Messages",
      onClick: () => router.replace("/in/messaging"),
      isActive: isActive("/in/messaging")
    },
    {
      Icon: NotificationsIcon,
      label: "Notifications",
      onClick: () => router.replace("/in/notifications"),
      rest: (open: boolean) => ({
        id: 'notification-btn',
        "aria-controls": open ? 'notification-menu' : undefined,
        "aria-haspopup": "true",
        "aria-expanded": open ? 'true' : undefined
      }) as React.ButtonHTMLAttributes<HTMLButtonElement>


    },
  ], [pathname])

  return { navButtons, router }
}