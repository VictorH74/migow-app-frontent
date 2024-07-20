/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { usePathname, useRouter } from "next/navigation";
import { PeoplesModalStatus } from "@/types";

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";


export type NavButtonsType = {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
    label: string,
    onClick(): void,
    isActive: boolean,
    rest?: (open: boolean) => React.ButtonHTMLAttributes<HTMLButtonElement>
}

export default function useClientSideInLayout() {
    const [peoplesModalStatus, setPeoplesModalStatus] = React.useState<PeoplesModalStatus>("hidden");

    const [showAddPostModal, setShowAddPostModal] = React.useState(false);
    const [showFixedChatListSidebar, setShowFixedChatListSidebar] = React.useState(false);


    const router = useRouter()
    const pathname = usePathname()

    const isActive = (name: string) => pathname === name;

    const openedModal = React.useMemo(
        () => peoplesModalStatus
            || showAddPostModal
            || showFixedChatListSidebar,
        [peoplesModalStatus, showAddPostModal, showFixedChatListSidebar]
    )

    const navButtons = React.useMemo<NavButtonsType[]>(() => [
        {
            Icon: AddIcon,
            label: "Add Post",
            onClick: () => setShowAddPostModal((prev) => !prev),
            isActive: showAddPostModal
        },
        {
            Icon: HomeIcon,
            label: "Home",
            onClick: () => router.replace("/in/posts"),
            isActive: !openedModal && isActive("/in/posts")
        },
        {
            Icon: PeopleIcon,
            label: "Peoples",
            onClick: () => setPeoplesModalStatus(() => "inPeoples"),
            isActive: peoplesModalStatus !== "hidden"
        },
        {
            Icon: ModeCommentIcon,
            label: "Messages",
            onClick: () => setShowFixedChatListSidebar((prev) => !prev),
            isActive: showFixedChatListSidebar
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
            }) as React.ButtonHTMLAttributes<HTMLButtonElement>,
            isActive: isActive("/in/notifications")


        },
    ], [pathname, peoplesModalStatus, showAddPostModal, showFixedChatListSidebar, openedModal])

    const openPeoplesModalInFollowers = () => {
        setPeoplesModalStatus("inFollowers")
    }

    return {
        navButtons,
        router,
        peoplesModalStatus,
        showAddPostModal,
        showFixedChatListSidebar,
        setPeoplesModalStatus,
        setShowAddPostModal,
        setShowFixedChatListSidebar,
        openPeoplesModalInFollowers,
    }
}