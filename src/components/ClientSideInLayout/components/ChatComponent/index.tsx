"use client"
import React from "react";
import { createPortal } from "react-dom";
import FixedChatListSidebar from "../ChatListSidebar";
import ChatBoxList from "../ChatBoxList";
import ChatBox from "../ChatBox";
import useChatComponent, { ChatComponentProps } from "./useChatComponent";

export default function ChatComponent(props: ChatComponentProps) {
    const hook = useChatComponent(props);

    return hook.isMounted && (
        <>
            {props.showFixedChatListSidebar && (
                <FixedChatListSidebar
                    chats={hook.chats}
                    loadChats={hook.loadChats}
                    includeChatBoxFunc={hook.includeChatBox}
                    onClose={props.onClose}
                    showFixedChatListSidebar={props.showFixedChatListSidebar}
                />
            )}

            {createPortal(
                <ChatBoxList
                    ref={hook.chatBoxListContainerRef}
                    showFixedChatListSidebar={props.showFixedChatListSidebar}
                >
                    {
                        hook.chatBoxes.map(chatBox => (
                            <ChatBox
                                key={chatBox.chatId}
                                chatBox={chatBox}
                                onClick={chatBox.isOpen ? hook.closeChatBox : hook.openChatBox}
                                onRemove={hook.removeChatBox}
                            />
                        ))
                    }

                </ChatBoxList>
                ,
                document.body
            )}
        </>
    )
}