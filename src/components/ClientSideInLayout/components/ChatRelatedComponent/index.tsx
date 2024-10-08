'use client';
import React from 'react';
import useChatRelatedComponent, {
    ChatRelatedComponentProps,
} from './useChatRelatedComponent';

export default function ChatRelatedComponent(props: ChatRelatedComponentProps) {
    const hook = useChatRelatedComponent(props);

    return <></>;

    // return (
    //     hook.isMounted && (
    //         <>
    //             {props.showFixedChatListSidebar && (
    //                 <ChatMetadataListSidebar onClose={props.onClose} />
    //             )}

    //             {createPortal(
    //                 <ChatBoxList
    //                     ref={hook.chatBoxListContainerRef}
    //                     showChatMetadataList={
    //                         props.showFixedChatListSidebar
    //                     }
    //                 >
    //                     {hook.chatBoxes.map((chatBox) => (
    //                         <ChatBox
    //                             key={chatBox.user.id}
    //                             chatBox={chatBox}
    //                             onClick={
    //                                 chatBox.isOpen
    //                                     ? hook.closeChatBox
    //                                     : hook.openChatBox
    //                             }
    //                             onRemove={hook.removeChatBox}
    //                         />
    //                     ))}
    //                 </ChatBoxList>,
    //                 document.body
    //             )}
    //         </>
    //     )
    // );
}
