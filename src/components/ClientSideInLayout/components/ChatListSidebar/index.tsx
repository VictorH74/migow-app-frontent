/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import { fixedChatListSidebarWidth } from '@/components/ClientSideInLayout/components/ChatRelatedComponent/useChatRelatedComponent';
import ChatListItem from './ChatListItem';
import { ChatMetadataInterface } from '@/interfaces/Chat';
import useChatList from '@/hooks/useChatList';
import { useChatboxList } from '@/hooks/useChatboxList';
import { UserInterface } from '@/interfaces/User';

interface FixedChatListSidebarProps {
    onClose(): void;
    currentUserId: UserInterface['id'];
}

export function ChatMetadataListSidebar(props: FixedChatListSidebarProps) {
    const { chatList, loadingChatList } = useChatList();
    const { includeChatBox } = useChatboxList();
    const sidebarRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const paddingRight =
            window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${paddingRight}px`;

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, []);

    const handleClose = React.useCallback(() => {
        if (!sidebarRef.current) return;
        const sidebar = sidebarRef.current;
        sidebar.classList.add('animate-toright');
        setTimeout(() => {
            props.onClose();
        }, 100);
    }, [sidebarRef]);

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/20"
            onClick={handleClose}
        >
            <div
                style={{
                    right: '-100%',
                    width: fixedChatListSidebarWidth,
                }}
                className="absolute inset-y-0 bg-white px-2 py-4 shadow-xl animate-comefromright duration-200"
                ref={sidebarRef}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </button>
                <h1 className="text-2xl text-gradient w-fit mx-auto">
                    Messages
                </h1>
                {/* <button onClick={() => props.includeChatBoxFunc({ id: new Date().toISOString() })}>test add chatbox</button> */}
                {chatList && (
                    <ul className="">
                        {chatList.map((chatMetadata, i) => (
                            <ChatListItem
                                key={chatMetadata.id}
                                currentUserId={props.currentUserId}
                                onClick={(user) =>
                                    includeChatBox({
                                        chatMetadata,
                                        user,
                                        fromChatMetadataList: true,
                                    })
                                }
                                {...chatMetadata}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>,
        document.body
    );
}
