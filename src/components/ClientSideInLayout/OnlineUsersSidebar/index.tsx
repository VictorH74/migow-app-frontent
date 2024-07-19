"use client"

import { SxProps } from "@mui/material";
import useOnlineUsersSidebar, { OnlineFollowerBtnSize } from "./useOnlineUsersSidebar";
import Avatar from "@/components/Avatar";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import usePopup from "@/hooks/usePopup";
import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';


const sxProps: SxProps = {
    height: OnlineFollowerBtnSize,
    width: OnlineFollowerBtnSize,

}

interface OnlineUsersSidebarProps {
    incrementRight: boolean
    openPeoplesModalInFollowers(): void
}

// TODO: Include friendships list with online users on top
export default function OnlineUsersSidebar(props: OnlineUsersSidebarProps) {
    const hook = useOnlineUsersSidebar();
    const popup = usePopup()

    const menuItemObjs = React.useMemo(() => [
        {
            onClick: popup.handleClose,
            Icon: VisibilityIcon,
            label: "See Profile",
        },
        {
            onClick: popup.handleClose,
            Icon: SendIcon,
            label: "Send Message",
        },
    ], [popup.handleClose])

    return (
        <div
            id="online-friendships"
            style={{
                right: 20 + (props.incrementRight ? innerWidth - document.documentElement.clientWidth : 0)
            }}
            className="fixed bottom-5 grid gap-4 place-items-center"
        >
            {hook.onlineUsers.map((user) => (
                <React.Fragment key={user.id}>
                    <button
                        className="relative"
                        id="online-friendships-button"
                        aria-controls={popup.open ? 'online-friendships-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={popup.open ? 'true' : undefined}
                        onClick={popup.handleClick}
                    >
                        <Avatar
                            className="m-0"
                            image={user.profileImageUrl || user.name}
                            avatarSxProps={sxProps}
                        />
                        <span className="bg-green-400 border border-white size-[15px] absolute rounded-full right-0 top-0" />
                    </button>
                    <Menu
                        disableScrollLock
                        id="online-friendships-menu"
                        anchorEl={popup.anchorEl}
                        open={popup.open}
                        onClose={popup.handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'online-friendships-button',
                        }}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'right',
                        }}
                    >
                        {
                            menuItemObjs.map(item => (
                                <MenuItem
                                    key={item.label}
                                    onClick={item.onClick}
                                >
                                    {<item.Icon />} <span className="mx-1"></span> {item.label}
                                </MenuItem>
                            ))
                        }
                    </Menu>
                </React.Fragment>




            ))}
            <button
                className="size-[50px] mx-auto rounded-full bg-gray-600 text-white font-semibold"
                onClick={props.openPeoplesModalInFollowers}
            >
                +{hook.onlineUsersCount}
            </button>
        </div>
    )
}