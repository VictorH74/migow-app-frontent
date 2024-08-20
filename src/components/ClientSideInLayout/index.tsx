"use client"
import React from "react";
import useClientSideInLayout from "./useClientSideInLayout";
import LoadingLazyComponent from "../LoadingLazyComponent";
import OnlineUsersSidebar from "./components/OnlineUsersSidebar";
import Header from "./components/Header";
import ChatComponent from "./components/ChatComponent";
import { UserInterface } from "@/interfaces/User";
import PostArrayProvider from "@/contexts/PostArrayProvider";

const PeoplesModal = React.lazy(() => import('./components/PeoplesModal'));
const NewPostFormModal = React.lazy(() => import('./components/NewPostFormModal'));
// const FixedChatListSidebar = React.lazy(() => import('./FixedChatListSidebar'));

interface ClientSideInLayoutProps extends React.PropsWithChildren {
    currentUser: UserInterface.SimpleType
}

export default function ClientSideInLayout(props: ClientSideInLayoutProps) {
    const hook = useClientSideInLayout()

    return (
        <PostArrayProvider>
            <Header navButtons={hook.navButtons} currentUser={props.currentUser} />
            {props.children}
            <OnlineUsersSidebar
                openPeoplesModalInFriends={hook.openPeoplesModalInFriends}
                incrementRight={hook.showAddPostModal || hook.showFixedChatListSidebar || hook.peoplesModalStatus !== "hidden"}
            />

            <React.Suspense fallback={<LoadingLazyComponent />}>
                {hook.showAddPostModal && (<NewPostFormModal onClose={() => hook.setShowAddPostModal(false)} />)}
            </React.Suspense>

            <React.Suspense fallback={<LoadingLazyComponent />}>
                {hook.peoplesModalStatus !== "hidden" && (<PeoplesModal currentUser={props.currentUser} peoplesModalStatus={hook.peoplesModalStatus} onClose={() => hook.setPeoplesModalStatus("hidden")} />)}
            </React.Suspense>

            <ChatComponent
                showFixedChatListSidebar={hook.showFixedChatListSidebar}
                onClose={() => hook.setShowFixedChatListSidebar(false)}
            />
        </PostArrayProvider>
    )

}