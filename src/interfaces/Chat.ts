import { ISODateType } from "@/types";
import { MessageInterface } from "./Message";
import { UserInterface } from "./User";

export interface ChatInterface {
    id: string
    users: [string, string]
    createdAt: ISODateType
    recentMessage?: Omit<MessageInterface, "id">;
}

export namespace ChatInterface {
    export type IdType = Pick<ChatInterface, "id">

    export type ChatIdWithUserType = { chat: IdType, user: UserInterface.SimpleType }

    export type ChatBoxType = {
        chatId: string,
        user: UserInterface.SimpleType
        isOpen?: boolean;
    }
}