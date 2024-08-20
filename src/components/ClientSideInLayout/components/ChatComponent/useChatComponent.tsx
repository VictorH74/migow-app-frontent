/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { chatsMock } from "@/mockData";
import { ChatInterface } from "@/interfaces/Chat";

export const fixedChatListSidebarWidth = 400
export const openChatBoxHeight = 600
export const openChatBoxWidth = 500
export const closedChatBoxHeight = 50
export const closedChatBoxWidth = 230
export const chatBoxListContainerGap = 10

export type NavButtonsType = {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
    label: string,
    onClick(): void,
    isActive: boolean,
    rest?: (open: boolean) => React.ButtonHTMLAttributes<HTMLButtonElement>
}

export interface ChatComponentProps {
    showFixedChatListSidebar: boolean
    onClose(): void
}

export default function useChatComponent(props: ChatComponentProps) {
    const [chats, setChats] = React.useState<ChatInterface[] | undefined>()
    const [chatBoxes, setChatBoxes] = React.useState<ChatInterface.ChatBoxType[]>([])
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    const chatBoxListContainerRef = React.useRef<HTMLUListElement>(null)

    // TODO: fetch user chats from firebase
    const loadChats = async () => {
        setChats(chatsMock)
    }

    const getOccupiedWidth = (predicate?: (chatBox: ChatInterface.ChatBoxType) => boolean | undefined) => {
        return chatBoxes.reduce((currentTotal, chatBox) => {
            return currentTotal + ((predicate ? predicate(chatBox) : chatBox.isOpen) ? openChatBoxWidth : closedChatBoxWidth)
        }, 0)
    }

    const getOccupiedWidthWithSpacing = (occupiedWidth: number) => occupiedWidth + (chatBoxes.length + 1) * chatBoxListContainerGap

    const hasSpacingToNewChatBox = (occupiedWidth: number) => {

        const futureOccupiedWidth = getOccupiedWidthWithSpacing(occupiedWidth) + openChatBoxWidth
        return futureOccupiedWidth <= chatBoxListContainerRef.current!.offsetWidth;
    }

    const includeChatBox = React.useCallback(async (chatBox: ChatInterface.ChatBoxType) => {
        const chatBoxWithSpecifiedChatId = chatBoxes.find(_chatBox => _chatBox.chatId === chatBox.chatId)
        if (!!chatBoxWithSpecifiedChatId)
            return (chatBoxWithSpecifiedChatId.isOpen ? closeChatBox : openChatBox)(chatBox.chatId)

        const newChatBox: ChatInterface.ChatBoxType = { ...chatBox, isOpen: true }

        const occupiedWidth = getOccupiedWidth()

        if (hasSpacingToNewChatBox(occupiedWidth)) {
            return setChatBoxes(prev => [...prev, newChatBox])
        }

        let newChatBoxIncluded = false
        // close chat boxes until a new chat box is possible
        const openChatBoxesMap: Record<string, ChatInterface.ChatBoxType> = {}
        for (let i = 0; i < chatBoxes.length; i++) {
            if (chatBoxes[i].isOpen) openChatBoxesMap[chatBoxes[i].chatId] = chatBoxes[i]

            const occupiedWidth = getOccupiedWidth(chatBox => chatBox.isOpen && !Object.hasOwn(openChatBoxesMap, chatBox.chatId))
            if (hasSpacingToNewChatBox(occupiedWidth)) {
                setChatBoxes(prev => [
                    ...prev.map(
                        chatBox => Object.hasOwn(openChatBoxesMap, chatBox.chatId)
                            ? { ...chatBox, isOpen: false }
                            : chatBox
                    ),
                    newChatBox
                ])

                newChatBoxIncluded = true
                break;
            }
        }

        if (newChatBoxIncluded) return

        // remove chat boxes until a new chat box is possible
        const onRemoveChatsIds: string[] = []
        let widthToDecrease = 0
        for (let i = chatBoxes.length - 1; i >= 0; i--) {
            const chatBox = chatBoxes[i]

            widthToDecrease += (chatBox.isOpen ? openChatBoxWidth : closedChatBoxWidth + chatBoxListContainerGap)
            const futureOccupiedWidth = getOccupiedWidth() - widthToDecrease
            console.log("widthToDecrease", widthToDecrease)
            console.log("futureOccupiedWidth", futureOccupiedWidth)
            console.log("asSpacingToNewChatBox", hasSpacingToNewChatBox(futureOccupiedWidth))
            if (hasSpacingToNewChatBox(futureOccupiedWidth)) {
                setChatBoxes(prev => [
                    ...prev.filter(cb => !onRemoveChatsIds.includes(cb.chatId) || !(chatBox.chatId == cb.chatId)),
                    newChatBox
                ])
                break;
            }
            console.log(onRemoveChatsIds.push(chatBox.chatId))
        }

    }, [chatBoxes])

    const removeChatBox = React.useCallback((chatId: string) => {
        setChatBoxes(prev => prev.filter(chatBox => chatBox.chatId !== chatId))
    }, [chatBoxes])

    const openChatBox = React.useCallback((chatId: string) => {
        const occupiedWidth = getOccupiedWidth(chatBox => chatBox.isOpen || chatBox.chatId === chatId)
        if (getOccupiedWidthWithSpacing(occupiedWidth) > chatBoxListContainerRef.current!.offsetWidth) {
            // loop until find a closed chat box to remove and open the target chat
            for (let i = chatBoxes.length - 1; i >= 0; i--) {
                const chatBox = chatBoxes[i]
                const isClosedChatBoxAndNotTarget = !chatBox.isOpen && chatBox.chatId !== chatId
                if (isClosedChatBoxAndNotTarget) {
                    setChatBoxes(prev => prev.filter((_, index) => index !== i)
                        .map(chatBox => chatBox.chatId === chatId && !chatBox.isOpen
                            ? { ...chatBox, isOpen: true }
                            : chatBox
                        ))
                    break;
                }
            }
            return
        }
        setChatBoxes(prev => prev.map(chatBox => chatBox.chatId === chatId && !chatBox.isOpen ? { ...chatBox, isOpen: true } : chatBox))
    }, [chatBoxes])

    const closeChatBox = React.useCallback((chatId: string) => {
        setChatBoxes(prev => prev.map(chatBox => chatBox.chatId === chatId && chatBox.isOpen ? { ...chatBox, isOpen: false } : chatBox))
    }, [chatBoxes])

    return {
        isMounted,
        chats,
        loadChats,
        includeChatBox,
        chatBoxListContainerRef,
        chatBoxes,
        closeChatBox,
        openChatBox,
        removeChatBox,
    }
}