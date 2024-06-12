import Avatar from "@/components/Avatar";
import useChatListItem, { ChatListItemProps } from "./useChatListItem";
import circleImg from "@/assets/gradient-circle-img.png"
import Image from "next/image";

export default function ChatListItem(props: ChatListItemProps) {
    const hook = useChatListItem(props);

    return (
        <li
            key={props.id}
            className="p-2 my-2 flex gap-2 items-center shadow-sm cursor-pointer hover:bg-gray-200 rounded-md duration-150"
            onClick={hook.chatUser ? () => props.onClick(hook.chatUser!) : undefined}
        >
            <div className="">
                {
                    hook.chatUser
                        ? (
                            <Avatar image={hook.chatUser.profileImageUrl || hook.chatUser.name} avatarSxProps={{ width: 40, height: 40, fontSize: 15 }} />
                        )
                        : (
                            <Image width={40} height={40} alt="loading circle image" src={circleImg} />
                        )
                }
            </div>
            <div>
                <p>{hook.chatUser?.username || "Loading username..."}</p>
                {props.recentMessage && (
                    <p>{props.recentMessage.content}</p>
                )}
            </div>


        </li>
    )
}