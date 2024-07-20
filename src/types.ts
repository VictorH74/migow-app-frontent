import { ChatInterface, UserInterface } from "./interfaces"

type ISODateType = string

type ChatIdType = Pick<ChatInterface, "id">

type SimpleUserType = Pick<UserInterface, "id" | "username" | "name" | "profileImageUrl">

// type ProfileUserType = Pick<UserInterface, "id" | "username" | "name" | "profileImageUrl" | "bgImageUrl" | "bio" | "createdAt">
type ProfileUserType = Pick<UserInterface, "id" | "username" | "name" | "profileImageUrl" | "bgImageUrl" | "createdAt"> /* & { friendshipCount: number } */

type RetrievedUserType = SimpleUserType & { isFriend: boolean }

type ChatIdWithUserType = { chat: ChatIdType, user: SimpleUserType }

type GetAllPostFilterType = "recent" | "popular"

type ChatBoxType = {
    chatId: string,
    user: SimpleUserType
    isOpen?: boolean;
}

type PeoplesModalStatus = "hidden" | "inPeoples" | "inFollowers"

type Sort = {
    sorted: boolean
    empty: boolean
    unsorted: boolean
}
type Pageable = {
    pageNumber: number,
    pageSize: number,
    sort: Sort,
    offset: number,
    paged: boolean,
    unpaged: boolean,
}
type ResponsePageType<T> = {
    totalPages: number,
    pageable: Pageable,
    first: number,
    last: number,
    size: number,
    content: T[],
    number: number,
    sort: Sort,
    numberOfElements: number,
    empty: boolean,
}

export type {
    ISODateType,
    ChatIdType,
    SimpleUserType,
    ProfileUserType,
    RetrievedUserType,
    GetAllPostFilterType,
    ChatIdWithUserType,
    ChatBoxType,
    PeoplesModalStatus,
    ResponsePageType
}
