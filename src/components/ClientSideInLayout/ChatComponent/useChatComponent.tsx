/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { ChatBoxType } from "@/types";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { ChatInterface } from "@/interfaces";
import { chatsMock } from "@/mockData";

export const fixedChatListSidebarWidth = 400
export const openChatBoxHeight = 600
export const openChatBoxWidth = 500
export const closedChatBoxHeight = 60
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
    const [chatBoxes, setChatBoxes] = React.useState<ChatBoxType[]>([])
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    const chatBoxListContainerRef = React.useRef<HTMLUListElement>(null)

    // TODO: fetch user chats from firebase
    const loadChats = async () => {
        setChats(chatsMock)
    }

    const getChatBoxesWidthCalc = (predicate?: (chatBox: ChatBoxType) => boolean | undefined) => {
        return chatBoxes.reduce((currentTotal, chatBox) => {
            return currentTotal + ((predicate ? predicate(chatBox) : chatBox.isOpen) ? openChatBoxWidth : closedChatBoxWidth)
        }, 0)
    }

    const getChatBoxesWidthCalcWithSpacing = (chatBoxesWidthCalc: number) => chatBoxesWidthCalc + ((chatBoxes.length + 1) * chatBoxListContainerGap)

    const hasSpacingToNewChatBox = (chatBoxesWidthCalc: number) => {
        const futureChatBoxesWidthCalc = getChatBoxesWidthCalcWithSpacing(chatBoxesWidthCalc) + openChatBoxWidth
        return futureChatBoxesWidthCalc <= chatBoxListContainerRef.current!.offsetWidth;
    }

    const includeChatBox = React.useCallback(async (chatBox: ChatBoxType) => {
        const chatBoxWithSpecifiedChatId = chatBoxes.find(_chatBox => _chatBox.chatId === chatBox.chatId)
        if (!!chatBoxWithSpecifiedChatId)
            return (chatBoxWithSpecifiedChatId.isOpen ? closeChatBox : openChatBox)(chatBox.chatId)

        const newChatBox: ChatBoxType = { ...chatBox, isOpen: true }

        const chatBoxesWidthCalc = getChatBoxesWidthCalc()
        // const chatBoxesWidthCalc = getChatBoxesWidthCalc(chatBox => chatBox.isOpen)
        if (hasSpacingToNewChatBox(chatBoxesWidthCalc)) {
            return setChatBoxes(prev => [...prev, newChatBox])
        }

        let newChatBoxIncluded = false
        // close chat boxes until a new chat box is possible
        const openChatBoxesObj: Record<string, ChatBoxType> = {}
        for (let i = 0; i < chatBoxes.length; i++) {
            if (chatBoxes[i].isOpen) openChatBoxesObj[chatBoxes[i].chatId] = chatBoxes[i]

            const chatBoxesWidthCalc = getChatBoxesWidthCalc(chatBox => chatBox.isOpen && !Object.hasOwn(openChatBoxesObj, chatBox.chatId))
            if (hasSpacingToNewChatBox(chatBoxesWidthCalc)) {
                setChatBoxes(prev => [
                    ...prev.map(
                        chatBox => Object.hasOwn(openChatBoxesObj, chatBox.chatId)
                            ? { ...openChatBoxesObj[chatBox.chatId], isOpen: false }
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
            widthToDecrease = chatBox.isOpen ? openChatBoxWidth : closedChatBoxWidth
            const futureChatBoxesWidthCalc = getChatBoxesWidthCalc() - widthToDecrease
            if (hasSpacingToNewChatBox(futureChatBoxesWidthCalc)) {
                setChatBoxes(prev => [
                    ...prev.filter(cb => !onRemoveChatsIds.includes(cb.chatId)),
                    newChatBox
                ])
                break;
            }
            onRemoveChatsIds.push(chatBox.chatId)
        }

    }, [chatBoxes])

    const removeChatBox = React.useCallback((chatId: string) => {
        setChatBoxes(prev => prev.filter(chatBox => chatBox.chatId !== chatId))
    }, [chatBoxes])

    const openChatBox = React.useCallback((chatId: string) => {
        const chatBoxesWidthCalc = getChatBoxesWidthCalc(chatBox => chatBox.isOpen || chatBox.chatId === chatId)
        if (getChatBoxesWidthCalcWithSpacing(chatBoxesWidthCalc) > chatBoxListContainerRef.current!.offsetWidth) {
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