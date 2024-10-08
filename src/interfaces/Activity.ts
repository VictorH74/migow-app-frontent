import { UserEventEnum } from '@/enums';
import { UserInterface } from './User';
import { ISODateType } from '@/types';
import { PostInterface } from './Post';
import { CommentInterface } from './Comment';
import { ReactionInterface } from './Reaction';

export interface ActivityInterface {
    id: number;
    ownerId: UserInterface['id'];
    userEventCode: UserEventEnum;
    createdAt: ISODateType;
    post: PostInterface;

    comment?: CommentInterface;
    replyComment?: Omit<CommentInterface.ReplyType, 'comment'> & {
        comment: Omit<CommentInterface, 'postId'>;
    };
    Reaction?: ReactionInterface.SimpleType;
}
