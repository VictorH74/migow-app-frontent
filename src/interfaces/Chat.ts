import { ISODateType } from '@/types';
import { MessageInterface } from './Message';
import { UserInterface } from './User';

export interface ChatMetadataInterface {
    id: string;
    users: [string, string];
    createdAt: ISODateType;
    recentMessage?: Omit<MessageInterface, 'id'>;
}

export namespace ChatMetadataInterface {
    export type IdType = Pick<ChatMetadataInterface, 'id'>;

    export type ChatIdWithUserType = {
        chat: IdType;
        user: UserInterface.SimpleType;
    };

    export type ChatBoxType = {
        chatMetadata?: ChatMetadataInterface;
        user: UserInterface.SimpleType;
        isOpen?: boolean;
        fromChatMetadataList?: boolean;
    };
}
