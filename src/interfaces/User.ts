import { ISODateType } from "@/types";
import { FriendshipStatusEnum, ReactionTypeEnum } from "@/enums";

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

    export type RetrievedType = SimpleType & { friendshipStatus: FriendshipStatusEnum }

    export type OnlineUserType = {
        id: string,
        username: string
        name: string;
        profileImageUrl?: string
    }

    export type CreateType = {
        username: string;
        password: string;
        name: string;
        email: string;
        profileImageUrl: string | null;
        bgImageUrl: string | null;
    }

    export type ReactionUserType = SimpleType & {
        reactionType: ReactionTypeEnum
    }
}