/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { chatsMock } from '@/mockData';
import { ChatMetadataInterface } from '@/interfaces/Chat';
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getCurrentUser } from '@/lib/actions';

export const fixedChatListSidebarWidth = 400;
export const openChatBoxHeight = 600;
export const openChatBoxWidth = 500;
export const closedChatBoxHeight = 50;
export const closedChatBoxWidth = 230;
export const chatBoxListContainerGap = 10;

export type NavButtonsType = {
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
    label: string;
    onClick(): void;
    isActive: boolean;
    rest?: (open: boolean) => React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export interface ChatRelatedComponentProps {
    showFixedChatListSidebar: boolean;
    onClose(): void;
}

export default function useChatRelatedComponent(
    props: ChatRelatedComponentProps
) {
    const [chatBoxes, setChatBoxes] = React.useState<
        ChatMetadataInterface.ChatBoxType[]
    >([]);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const chatBoxListContainerRef = React.useRef<HTMLUListElement>(null);

    const getOccupiedWidth = (
        predicate?: (
            chatBox: ChatMetadataInterface.ChatBoxType
        ) => boolean | undefined
    ) => {
        return chatBoxes.reduce((currentTotal, chatBox) => {
            return (
                currentTotal +
                ((predicate ? predicate(chatBox) : chatBox.isOpen)
                    ? openChatBoxWidth
                    : closedChatBoxWidth)
            );
        }, 0);
    };

    const getOccupiedWidthWithSpacing = (occupiedWidth: number) =>
        occupiedWidth + (chatBoxes.length + 1) * chatBoxListContainerGap;

    const hasSpacingToNewChatBox = (occupiedWidth: number) => {
        const futureOccupiedWidth =
            getOccupiedWidthWithSpacing(occupiedWidth) + openChatBoxWidth;
        return (
            futureOccupiedWidth <= chatBoxListContainerRef.current!.offsetWidth
        );
    };

    const getExistingChatbox = (
        userId: ChatMetadataInterface.ChatBoxType['user']['id']
    ) => {
        return chatBoxes.find((_chatBox) => _chatBox.user.id === userId);
    };

    const includeChatBox = React.useCallback(
        async (chatBox: ChatMetadataInterface.ChatBoxType) => {
            const existingChatbox = getExistingChatbox(chatBox.user.id);

            if (!!existingChatbox)
                return (existingChatbox.isOpen ? closeChatBox : openChatBox)(
                    chatBox.user.id
                );

            const newChatBox: ChatMetadataInterface.ChatBoxType = {
                ...chatBox,
                isOpen: true,
            };

            const occupiedWidth = getOccupiedWidth();

            if (hasSpacingToNewChatBox(occupiedWidth)) {
                return setChatBoxes((prev) => [...prev, newChatBox]);
            }

            let newChatBoxIncluded = false;
            // close chat boxes until a new chat box is possible
            const openChatBoxesMap: Record<
                string,
                ChatMetadataInterface.ChatBoxType
            > = {};
            for (let i = 0; i < chatBoxes.length; i++) {
                if (chatBoxes[i].isOpen)
                    openChatBoxesMap[chatBoxes[i].user.id] = chatBoxes[i];

                const occupiedWidth = getOccupiedWidth(
                    (chatBox) =>
                        chatBox.isOpen &&
                        !Object.hasOwn(openChatBoxesMap, chatBox.user.id)
                );
                if (hasSpacingToNewChatBox(occupiedWidth)) {
                    setChatBoxes((prev) => [
                        ...prev.map((chatBox) =>
                            Object.hasOwn(openChatBoxesMap, chatBox.user.id)
                                ? { ...chatBox, isOpen: false }
                                : chatBox
                        ),
                        newChatBox,
                    ]);

                    newChatBoxIncluded = true;
                    break;
                }
            }

            if (newChatBoxIncluded) return;

            // remove chat boxes until a new chat box is possible
            const onRemoveChatsIds: string[] = [];
            let widthToDecrease = 0;
            for (let i = chatBoxes.length - 1; i >= 0; i--) {
                const chatBox = chatBoxes[i];

                widthToDecrease += chatBox.isOpen
                    ? openChatBoxWidth
                    : closedChatBoxWidth + chatBoxListContainerGap;
                const futureOccupiedWidth =
                    getOccupiedWidth() - widthToDecrease;
                if (hasSpacingToNewChatBox(futureOccupiedWidth)) {
                    setChatBoxes((prev) => [
                        ...prev.filter(
                            (cb) =>
                                !onRemoveChatsIds.includes(cb.user.id) ||
                                !(chatBox.user.id == cb.user.id)
                        ),
                        newChatBox,
                    ]);
                    break;
                }
                console.log(onRemoveChatsIds.push(chatBox.user.id));
            }
        },
        [chatBoxes]
    );

    const removeChatBox = React.useCallback(
        (userId: string) => {
            setChatBoxes((prev) =>
                prev.filter((chatBox) => chatBox.user.id !== userId)
            );
        },
        [chatBoxes]
    );

    const openChatBox = React.useCallback(
        (userId: string) => {
            const occupiedWidth = getOccupiedWidth(
                (chatBox) => chatBox.isOpen || chatBox.user.id === userId
            );

            if (
                getOccupiedWidthWithSpacing(occupiedWidth) >
                chatBoxListContainerRef.current!.offsetWidth
            ) {
                let canOpenTarget = false;
                // loop until find a closed chat box to remove and open the target chat
                for (let i = chatBoxes.length - 1; i >= 0; i--) {
                    const chatBox = chatBoxes[i];

                    if (!chatBox.isOpen && chatBox.user.id !== userId) {
                        setChatBoxes((prev) =>
                            prev
                                .filter((_, index) => index !== i)
                                .map((chatBox) =>
                                    chatBox.user.id === userId &&
                                    !chatBox.isOpen
                                        ? { ...chatBox, isOpen: true }
                                        : chatBox
                                )
                        );
                        canOpenTarget = true;
                        break;
                    }
                }

                if (!canOpenTarget) {
                    // loop to remove chatbox until be possible open the target
                    for (let i = chatBoxes.length - 1; i >= 0; i--) {
                        const chatBox = chatBoxes[i];

                        if (chatBox.isOpen && chatBox.user.id !== userId) {
                            setChatBoxes((prev) =>
                                prev
                                    .filter((_, index) => index !== i)
                                    .map((chatBox) =>
                                        chatBox.user.id === userId &&
                                        chatBox.isOpen
                                            ? { ...chatBox, isOpen: true }
                                            : chatBox
                                    )
                            );
                            break;
                        }
                    }
                }

                return;
            }
            setChatBoxes((prev) =>
                prev.map((chatBox) =>
                    chatBox.user.id === userId && !chatBox.isOpen
                        ? { ...chatBox, isOpen: true }
                        : chatBox
                )
            );
        },
        [chatBoxes]
    );

    const closeChatBox = React.useCallback(
        (userId: string) => {
            setChatBoxes((prev) =>
                prev.map((chatBox) =>
                    chatBox.user.id === userId && chatBox.isOpen
                        ? { ...chatBox, isOpen: false }
                        : chatBox
                )
            );
        },
        [chatBoxes]
    );

    return {
        isMounted,
        includeChatBox,
        chatBoxListContainerRef,
        chatBoxes,
        closeChatBox,
        openChatBox,
        removeChatBox,
    };
}
