import React from "react";
import { chatBoxListContainerGap, fixedChatListSidebarWidth, openChatBoxHeight } from "@/components/ClientSideInLayout/ChatComponent/useChatComponent";
import { OnlineFollowerBtnSize } from "../OnlineUsersSidebar/useOnlineUsersSidebar";

interface ChatBoxListProps extends React.PropsWithChildren {
    showFixedChatListSidebar: boolean
}

const ChatBoxList = React.forwardRef(function ChatBoxList(props: ChatBoxListProps, ref: React.ForwardedRef<HTMLUListElement>) {
    return (
        <ul
            ref={ref}
            style={{
                right: props.showFixedChatListSidebar ? fixedChatListSidebarWidth : chatBoxListContainerGap * 3 + OnlineFollowerBtnSize,
                height: openChatBoxHeight,
                gap: chatBoxListContainerGap,
                paddingRight: chatBoxListContainerGap,
                paddingLeft: chatBoxListContainerGap,
            }}
            className="fixed bottom-0 left-0 flex overflow-hidden items-end flex-row-reverse z-[9999] pointer-events-none duration-200"
        >
            {props.children}

        </ul>
    )
})

export default ChatBoxList