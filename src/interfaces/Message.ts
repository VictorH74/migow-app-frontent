import { ISODateType } from '@/types';
import { MediaInterface } from './Media';

export interface MessageInterface {
    id: string;
    sender: string;
    content?: string;
    media?: MediaInterface;
    isRead?: boolean;
    replyMsg: MessageInterface.ReplyType | null;
    sentAt: ISODateType;
}

export namespace MessageInterface {
    export type ReplyType = {
        id: string;
        sender: string;
        content?: string;
        media?: MediaInterface;
    };
}
