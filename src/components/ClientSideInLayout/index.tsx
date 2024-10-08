'use client';
import React from 'react';
import useClientSideInLayout from './useClientSideInLayout';
import LoadingLazyComponent from '../LoadingLazyComponent';
import OnlineUsersSidebar from './components/OnlineUsersSidebar';
import Header from './components/Header';
import ChatRelatedComponent from './components/ChatRelatedComponent';
import { UserInterface } from '@/interfaces/User';
import NewPostFormModal from './components/NewPostFormModal';
import ChatListProvider from '@/contexts/ChatListProvider';
import { ChatMetadataListSidebar } from './components/ChatListSidebar';
import { useChatboxList } from '@/hooks/useChatboxList';
import ChatBoxList from './components/ChatBoxList';
import { ChatboxListProvider } from '@/contexts/ChatboxListProvider';

const PeoplesModal = React.lazy(() => import('./components/PeoplesModal'));

// const FixedChatListSidebar = React.lazy(() => import('./FixedChatListSidebar'));

interface ClientSideInLayoutProps extends React.PropsWithChildren {
    currentUser: UserInterface.SimpleType;
}

export default function ClientSideInLayout(props: ClientSideInLayoutProps) {
    const hook = useClientSideInLayout();
    const { chatBoxListContainerRef } = useChatboxList();

    return (
        <ChatListProvider>
            <Header
                navButtons={hook.navButtons}
                currentUser={props.currentUser}
            />
            {props.children}
            <OnlineUsersSidebar
                openPeoplesModalInFriends={hook.openPeoplesModalInFriends}
                incrementRight={
                    hook.showAddPostModal ||
                    hook.showChatMetadataList ||
                    hook.peoplesModalStatus !== 'hidden'
                }
            />

            <NewPostFormModal />

            <React.Suspense fallback={<LoadingLazyComponent />}>
                {hook.peoplesModalStatus !== 'hidden' && (
                    <PeoplesModal
                        currentUser={props.currentUser}
                        peoplesModalStatus={hook.peoplesModalStatus}
                        onClose={() => hook.setPeoplesModalStatus('hidden')}
                    />
                )}
            </React.Suspense>

            {hook.showChatMetadataList && (
                <ChatMetadataListSidebar
                    onClose={() => hook.setShowChatMetadataList(false)}
                    currentUserId={props.currentUser.id}
                />
            )}

            <ChatBoxList
                ref={chatBoxListContainerRef}
                showChatMetadataList={hook.showChatMetadataList}
            />

            {/* TODO remove */}
            {/* <ChatRelatedComponent
                showFixedChatListSidebar={hook.showFixedChatListSidebar}
                onClose={() => hook.setShowFixedChatListSidebar(false)}
            /> */}
        </ChatListProvider>
    );
}
