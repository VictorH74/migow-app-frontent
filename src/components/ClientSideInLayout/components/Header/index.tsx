"use client"
import React from 'react';
import useHeader from "./useHeader"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import usePopup from '@/hooks/usePopup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationMenu from '@/components/NotificationMenu';
import Avatar from '@/components/Avatar';
import { Josefin_Sans } from 'next/font/google'
import { twMerge } from 'tailwind-merge';
import { NavButtonsType } from '@/components/ClientSideInLayout/useClientSideInLayout';
import IconButton from '@/components/IconButton';
import { UserInterface } from '@/interfaces/User';

const josefinSans = Josefin_Sans({ subsets: ["latin"], style: "italic" })

interface HeaderProps {
  navButtons: NavButtonsType[]
  currentUser: UserInterface.SimpleType
}


export default function Header(props: HeaderProps) {
  const hook = useHeader();
  const profilePopup = usePopup()
  const notificationsPopup = usePopup()

  return (
    <header
      style={{
      }}
      ref={hook.headerRef}
      className='h-20 max-[1400px]:px-2 bg-white z-[9999]'
    >
      <div className='h-full w-full max-w-[1400px] m-auto flex items-center justify-between'>
        <h1 className={twMerge('font-semibold text-2xl ', josefinSans.className, "text-gradient")}>MigoW</h1>
        <div className={twMerge('flex gap-7 text-gray-500')}>
          {props.navButtons.map(btn => (
            <IconButton
              key={btn.label}
              {...(btn.rest ? btn.rest(notificationsPopup.open) : {})}
              Icon={btn.Icon}
              onClick={btn.rest ? notificationsPopup.handleClick : btn.onClick}
              label={btn.label}
              iconSize={33}
              transparentBg
              isActive={btn.isActive}
            />
          ))}
          <button className=''
            id="basic-button"
            aria-controls={profilePopup.open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={profilePopup.open ? 'true' : undefined}
            onClick={profilePopup.handleClick}
          >
            <Avatar
              image={props.currentUser.profileImageUrl || props.currentUser.name}
              avatarSxProps={{ width: 35, height: 35, fontSize: 13 }}
            />
            Me
            <span><ExpandMoreIcon /></span>
          </button>
          <Menu
            disableScrollLock
            id="basic-menu"
            anchorEl={profilePopup.anchorEl}
            open={profilePopup.open}
            onClose={profilePopup.handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
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
            <MenuItem
              onClick={() => {
                hook.router.replace(`/in/profile/${props.currentUser.username}`)
                profilePopup.handleClose()
              }}
            >
              See profile
            </MenuItem>
            <MenuItem
              onClick={() => hook.router.replace("/in/settings")}
            >
              Settings
            </MenuItem>
            <MenuItem
              onClick={hook.handleLogOut}
            >Log out
            </MenuItem>
          </Menu>
          <NotificationMenu popup={notificationsPopup} />
        </div>
      </div>

    </header>
  );
}