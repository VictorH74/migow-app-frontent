/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React from "react";
import { createPortal } from "react-dom";
import CloseIcon from '@mui/icons-material/Close';
import { fixedChatListSidebarWidth } from "@/components/ClientSideInLayout/ChatComponent/useChatComponent";
import ChatListItem from "./ChatListItem";
import { ChatInterface } from "@/interfaces/Chat";

interface FixedChatListSidebarProps {
    onClose(): void
    includeChatBoxFunc(chatbox: ChatInterface.ChatBoxType): void
    showFixedChatListSidebar: boolean
    chats: ChatInterface[] | undefined
    loadChats(): void
}

// TODO: fetch user messages from firebase

export default function FixedChatListSidebar(props: FixedChatListSidebarProps) {
    const sidebarRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        const paddingRight = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${paddingRight}px`;

        if (!props.chats) props.loadChats()

        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }

    }, [])

    const handleClose = React.useCallback(() => {
        if (!sidebarRef.current) return;
        const sidebar = sidebarRef.current
        sidebar.classList.add("animate-toright")
        setTimeout(() => {
            props.onClose()
        }, 100)

    }, [sidebarRef])

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/20"
            onClick={handleClose}
        >
            <div
                style={{
                    right: "-100%",
                    width: fixedChatListSidebarWidth
                }}
                className="absolute inset-y-0 bg-white px-2 py-4 shadow-xl animate-comefromright duration-200"
                ref={sidebarRef}
                onClick={e => e.stopPropagation()}
            >
                <button className="absolute top-2 right-2" onClick={handleClose}><CloseIcon /></button>
                <h1 className="text-2xl text-gradient w-fit mx-auto">
                    Messages
                </h1>
                {/* <button onClick={() => props.includeChatBoxFunc({ id: new Date().toISOString() })}>test add chatbox</button> */}
                {props.chats && (
                    <ul className="">
                        {
                            props.chats.map((chat, i) => (
                                <ChatListItem
                                    key={chat.id}
                                    onClick={(user) => props.includeChatBoxFunc({chatId: chat.id, user})}
                                    {...chat}
                                />
                            ))
                        }
                    </ul>
                )}

            </div>
        </div>
        ,
        document.body
    )
}