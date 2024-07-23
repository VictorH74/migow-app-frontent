import { ISODateType } from "@/types";

export interface UserInterface {
    id: string,
    username: string
    name: string;
    email: string;
    profileImageUrl?: string
    bgImageUrl?: string
    bio?: string
    friendships: UserInterface[],
    createdAt: ISODateType
}

export namespace UserInterface {
    export type SimpleType = Pick<UserInterface, "id" | "username" | "name" | "profileImageUrl">

    export type ProfileType = Pick<UserInterface, "id" | "username" | "name" | "profileImageUrl" | "bgImageUrl" | "createdAt">

    export type RetrievedType = SimpleType & { isFriend: boolean }

    export type OnlineUserType = {
        id: string,
        username: string
        name: string;
        profileImageUrl?: string
    }
}