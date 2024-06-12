import { ChatInterface, UserInterface } from "./interfaces"

type ISODateType = string

type ChatIdType = Pick<ChatInterface, "id">

type SimpleUserType = Pick<UserInterface, "id" | "username" | "name" | "profileImageUrl">

type RetrievedUserType = Pick<UserInterface, "id" | "profileImageUrl" | "name" | "username"> & { isFollowed: boolean }

type ChatIdWithUserType = { chat: ChatIdType, user: SimpleUserType }

type ChatBoxType = { 
    chatId: string, 
    user: SimpleUserType
    isOpen?: boolean;
 }

 type PeoplesModalStatus = "hidden" | "inPeoples" | "inFollowers"

export type {
    ISODateType,
    ChatIdType,
    SimpleUserType,
    RetrievedUserType,
    ChatIdWithUserType,
    ChatBoxType,
    PeoplesModalStatus,
}
