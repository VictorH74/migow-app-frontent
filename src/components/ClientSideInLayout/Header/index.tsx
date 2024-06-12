"use client"
import React from 'react';
import useHeader from "./useHeader"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import usePopup from '@/hooks/usePopup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationMenu from '@/components/NotificationMenu';
import { UserInterface } from '@/interfaces';
import Avatar from '@/components/Avatar';
import { Josefin_Sans } from 'next/font/google'
import { twMerge } from 'tailwind-merge';
import { NavButtonsType } from '@/components/ClientSideInLayout/useClientSideInLayout';

const josefinSans = Josefin_Sans({ subsets: ["latin"], style: "italic" })


// temp 
const currentUser: UserInterface = {
  id: "vvv",
  name: "victor almeidaa",
  username: "vyctor74",
  createdAt: new Date().toISOString(),
  email: "victor@emai.com",
  followers: []
}


interface HeaderProps {
  navButtons: NavButtonsType[]
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
            <button
              key={btn.label}
              {...(btn.rest ? btn.rest(notificationsPopup.open) : {})}
              className={twMerge('text-center group hover:text-cyan-400 duration-200')}
              onClick={btn.rest ? notificationsPopup.handleClick : btn.onClick}
            >
              <btn.Icon sx={{ width: 35, height: 35, fontSize: 13 }} className={twMerge('', btn.isActive ? "text-cyan-400" : "")} />
              <p
                className={twMerge(`
                group-hover:bg-gradient-to-r 
                group-hover:from-red-200 
                group-hover:from-10% 
                group-hover:via-blue-500 
                group-hover:via-50% 
                group-hover:to-cyan-400 
                group-hover:to-100% 
                group-hover:bg-clip-text 
                group-hover:text-transparent 
                duration-150`, btn.isActive ? "text-gradient" : "")}
              >{btn.label}</p>
            </button>
          ))}
          <button className=''
            id="basic-button"
            aria-controls={profilePopup.open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={profilePopup.open ? 'true' : undefined}
            onClick={profilePopup.handleClick}
          >
            <Avatar
              image={currentUser.profileImageUrl || currentUser.name}
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
              onClick={profilePopup.handleClose}
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