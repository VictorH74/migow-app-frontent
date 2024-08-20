import React from "react";
import { twMerge } from "tailwind-merge";
import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@/components/Avatar";
import { closedChatBoxHeight, closedChatBoxWidth, openChatBoxHeight, openChatBoxWidth } from "@/components/ClientSideInLayout/components/ChatComponent/useChatComponent";
import { ChatInterface } from "@/interfaces/Chat";
import Loading from "@/components/Loading";

interface ChatBoxProps {
    chatBox: ChatInterface.ChatBoxType
    onRemove(chat: string): void
    onClick(chat: string): void
}


export default function ChatBox({ chatBox, ...props }: ChatBoxProps) {
    const [chat, setChat] = React.useState<ChatInterface | undefined>()
    const [error, setError] = React.useState<string | undefined>()
    const [isLoading, setIsLoading] = React.useState(true)
    const chatBoxContainerRef = React.useRef<HTMLLIElement>(null)

    React.useEffect(() => {
        // TODO: fetch chat by chatBox.chat.id from firebase
        try {
            // temp
            const retrievedChat: ChatInterface = {
                id: "vvv-bbb",
                createdAt: "",
                users: ["vvv", "bbb"],
            }

            setChat(retrievedChat)
        } catch (e) {
            setError("Error")
        } finally {
            setIsLoading(false)
        }

    }, [])

    React.useEffect(() => {
        if (!chatBoxContainerRef.current) return;
        const ref = chatBoxContainerRef.current!

        ref.style.width = (chatBox.isOpen ? openChatBoxWidth : closedChatBoxWidth) + "px"
        ref.style.height = (chatBox.isOpen ? openChatBoxHeight : closedChatBoxHeight) + "px"
        ref.style.overflow = "auto"
    }, [chatBox.isOpen])

    const handleRemove = () => {
        const ref = chatBoxContainerRef.current!
        ref.style.overflow = "hidden"
        ref.style.width = "0px"
        ref.style.height = "0px"
        setTimeout(() => props.onRemove(chatBox.chatId), 100)
    }

    return (
        <li
            ref={chatBoxContainerRef}
            className={twMerge("rounded-md bg-white shrink-0 shadow-md pointer-events-auto duration-200", chatBox.isOpen ? "" : "", error || isLoading ? "grid place-items-center" : "")}
        >
            {
                isLoading ? (
                    <div className="animate-spin size-fit">
                        <Loading height={50} width={50} />
                    </div>
                )
                    : error ? (<>
                        <button className="absolute top-3 right-3" onClick={handleRemove}><CloseIcon /></button>
                        <p className="py-1 px-5 rounded-md border border-red-500 text-red-500 font-semibold text-center">Error</p>
                    </>)
                        :
                        (<div
                            className={twMerge("rounded-md bg-white duration-200 shrink-0 shadow-md pointer-events-auto w-full h-full", chatBox.isOpen ? "" : "")}
                        >
                            <header
                                style={{
                                    height: closedChatBoxHeight,
                                }}
                                className='bg-gradient text-white duration-200 py-2 px-3 flex w-full rounded-t-md items-center'
                                onClick={() => props.onClick(chatBox.chatId)}
                            >
                                <Avatar
                                    image={chatBox.user.profileImageUrl || chatBox.user.name}
                                    avatarSxProps={{
                                        height: 40,
                                        width: 40,
                                        fontSize: 15
                                    }}
                                />
                                <p className="truncate grow shrink min-w-5 text-sm font-semibold">{chatBox.user.username}</p>
                                <button
                                    className=""
                                    onClick={e => {
                                        e.stopPropagation()
                                        handleRemove()
                                    }}
                                >
                                    <CloseIcon />
                                </button>
                            </header>
                            <div className="overflow-hidden"></div>
                        </div>)
            }
        </li>
    )
}