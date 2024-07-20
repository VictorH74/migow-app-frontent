"use client"
import React from "react";
import useClientSideInLayout from "./useClientSideInLayout";
import LoadingLazyComponent from "../LoadingLazyComponent";
import OnlineUsersSidebar from "./OnlineUsersSidebar";
import Header from "./Header";
import ChatComponent from "./ChatComponent";

const PeoplesModal = React.lazy(() => import('./PeoplesModal'));
const AddNewPostModal = React.lazy(() => import('./AddNewPostModal'));
// const FixedChatListSidebar = React.lazy(() => import('./FixedChatListSidebar'));

interface ClientSideInLayoutProps extends React.PropsWithChildren { }

export default function ClientSideInLayout(props: ClientSideInLayoutProps) {
    const hook = useClientSideInLayout()

    return (
        <>
            <Header navButtons={hook.navButtons} />
            {props.children}
            <OnlineUsersSidebar
                openPeoplesModalInFollowers={hook.openPeoplesModalInFollowers}
                incrementRight={hook.showAddPostModal || hook.showFixedChatListSidebar || hook.peoplesModalStatus !== "hidden"}
            />

            <React.Suspense fallback={<LoadingLazyComponent />}>
                {hook.showAddPostModal && (<AddNewPostModal onClose={() => hook.setShowAddPostModal(false)} />)}
            </React.Suspense>

            <React.Suspense fallback={<LoadingLazyComponent />}>
                {hook.peoplesModalStatus !== "hidden" && (<PeoplesModal peoplesModalStatus={hook.peoplesModalStatus} onClose={() => hook.setPeoplesModalStatus("hidden")} />)}
            </React.Suspense>

            <ChatComponent
                showFixedChatListSidebar={hook.showFixedChatListSidebar}
                onClose={() => hook.setShowFixedChatListSidebar(false)}
            />
        </>
    )

}