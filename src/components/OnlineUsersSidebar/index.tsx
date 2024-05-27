"use client"

import { SxProps } from "@mui/material";
import Avatar from "../Avatar";
import useOnlineUsersSidebar from "./useOnlineUsersSidebar";

const sxProps: SxProps = {
    height: 50,
    width: 50,
}

export default function OnlineUsersSidebar() {
    const hook = useOnlineUsersSidebar();

    return (
        <div className="fixed bottom-5 right-5 grid gap-4 place-items-center">
            {hook.onlineUsers.map((user, i) => (
                <div key={user.id} className="relative">
                    <Avatar
                        className="m-0"
                        image={user.profileImageUrl || user.name}
                        avatarSxProps={sxProps}
                    />
                    <span className="bg-green-400 border border-white size-[15px] absolute rounded-full right-0 top-0" />
                </div>

            ))}
            <button
                className="size-[50px] mx-auto rounded-full bg-gray-600 text-white font-semibold"
            >
                +{hook.onlineUsersCount}
            </button>
        </div>
    )
}