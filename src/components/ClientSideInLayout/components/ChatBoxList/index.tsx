import React from 'react';
import {
    chatBoxListContainerGap,
    fixedChatListSidebarWidth,
    openChatBoxHeight,
} from '@/components/ClientSideInLayout/components/ChatRelatedComponent/useChatRelatedComponent';
import { OnlineFollowerBtnSize } from '../OnlineUsersSidebar/useOnlineUsersSidebar';
import { createPortal } from 'react-dom';
import ChatBox from '../ChatBox';
import { useChatboxList } from '@/hooks/useChatboxList';

interface ChatBoxListProps {
    showChatMetadataList: boolean;
}

const ChatBoxList = React.forwardRef(function ChatBoxList(
    props: ChatBoxListProps,
    ref: React.ForwardedRef<HTMLUListElement>
) {
    const { chatBoxes } = useChatboxList();

    return createPortal(
        <ul
            ref={ref}
            style={{
                right: props.showChatMetadataList
                    ? fixedChatListSidebarWidth
                    : chatBoxListContainerGap * 3 + OnlineFollowerBtnSize,
                height: openChatBoxHeight,
                gap: chatBoxListContainerGap,
                paddingRight: chatBoxListContainerGap,
                paddingLeft: chatBoxListContainerGap,
            }}
            className="fixed bottom-0 left-0 flex overflow-hidden items-end flex-row-reverse z-[9999] pointer-events-none duration-200"
        >
            {chatBoxes.map((chatBox) => (
                <ChatBox key={chatBox.user.id} chatBox={chatBox} />
            ))}
        </ul>,
        document.body
    );
    // TODO remove
    // return (
    //     <ul
    //         ref={ref}
    //         style={{
    //             right: props.showChatMetadataList
    //                 ? fixedChatListSidebarWidth
    //                 : chatBoxListContainerGap * 3 + OnlineFollowerBtnSize,
    //             height: openChatBoxHeight,
    //             gap: chatBoxListContainerGap,
    //             paddingRight: chatBoxListContainerGap,
    //             paddingLeft: chatBoxListContainerGap,
    //         }}
    //         className="fixed bottom-0 left-0 flex overflow-hidden items-end flex-row-reverse z-[9999] pointer-events-none duration-200"
    //     >
    //         {props.children}
    //     </ul>
    // );
});

export default ChatBoxList;
