"use client"
import React from 'react';
import useNotificationMenu, { NotificationMenuProps } from "./useNotificationMenu"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { formatISODate, stringAvatar } from '@/util/functions';
import { useRouter } from 'next/navigation';


export default function NotificationMenu(props: NotificationMenuProps) {
  const hook = useNotificationMenu(props);
  const router = useRouter()

  return (
    <Menu
      disableScrollLock
      id="notification-menu"
      anchorEl={props.popup.anchorEl}
      open={props.popup.open}
      onClose={props.popup.handleClose}
      MenuListProps={{
        'aria-labelledby': 'notification-btn',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className='p-2 h-[400px] w-[300px]'>
        <h2 className='text-center text-xl'>Notifications</h2>
        <div className='bg-blue-400 w-full h-[2px] my-2' />
        {hook.loading ?
          (<div className='h-[300px] grid place-items-center'>
            <p>Loading...</p>
          </div>)
          : (<>
            {hook.notifications.map((notfication) => (
              <MenuItem key={notfication.id} onClick={props.popup.handleClose}>
                <Avatar
                  {...stringAvatar(notfication.owner.name, { width: 35, height: 35, fontSize: 13 })}
                />
                <p className='h-auto w-full text-wrap mx-2 text-sm'>
                  <span className='font-semibold'>{notfication.owner.username}</span>
                  {" "}
                  {
                    hook.getNotificationSegment(
                      notfication.userEvent,
                      notfication.relatedTargetId.owner.name
                    )
                  }
                </p>
                <p className='text-sm' >{formatISODate(notfication.createdAt)}</p>
              </MenuItem>
            ))}
            <MenuItem
              onClick={() => {
                router.replace("/in/settings/notifications")
                props.popup.handleClose()
              }}
            >
              <p className='rounded-md w-full py-2 text-center bg-gray-300 text-gray-700 font-semibold'>
                Notification Settings
              </p>

            </MenuItem>
          </>)
        }
      </div>

    </Menu>
  );
}