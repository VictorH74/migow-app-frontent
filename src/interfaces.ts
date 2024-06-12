import { UserEventEnum, VisibilityEnum } from "./enums";
import { ISODateType } from "./types";

export interface ReplyMsgType {
    id: string;
    sender: string;
    content?: string
    media?: MediaInterface
};

export interface MessageInterface {
    chatId: string
    id: number,
    // TODO: create dto to this sender
    sender: string;
    content?: string
    media?: MediaInterface
    isRead?: boolean
    replyMsg: ReplyMsgType | null;
    sentAt: ISODateType;
}

export interface ChatInterface {
    id: string
    users: [string, string]
    createdAt: ISODateType
    recentMessage?: Omit<MessageInterface, "id">;
}

// users service
export interface UserInterface {
    id: string,
    username: string
    name: string;
    email: string;
    profileImageUrl?: string
    bgImageUrl?: string
    bio?: string
    followers: UserInterface[],
    createdAt: ISODateType
}

export interface OnlineUserInterface {
    id: string,
    username: string
    name: string;
    profileImageUrl?: string
}

// ?
export interface UserGenericProperty {
    id: string;
    owner: UserInterface
    createdAt: ISODateType
}

// users service
export interface ProfileSettingsInterface {
    id: string;
    activityVisibility: VisibilityEnum
    followersVisibility: VisibilityEnum
    nameVisibility: VisibilityEnum
    // activityVisibility: VisibilityEnum
}

// posts service
interface MediaInterface {
    id: number,
    name: string,
    type: string
    src: string
}

// posts service
export interface PostInterface extends UserGenericProperty {
    text?: string,
    sharedPost?: PostInterface
    mediaURLs?: MediaInterface[],
    reactionCount: number
    commentCount: number
    shareCount: number
}

// posts service
// @unnique(userId, targetId)
export interface ReactionInterface extends UserGenericProperty {
    // id: {user: UserInterface, targetId: string}
    targetId: string, // post or comment
}

// posts service
// pk [user, post]
export interface CommentInterface {
    id: string
    user: UserInterface
    post: PostInterface
    content: string
    createdAt: ISODateType

    // TODO: include properties on returned CommentDTO
    reactionCount: number
    replyCommentCount: number

}

// posts service
// pk [user, comment]
export interface ReplayCommentInterface {
    id: string
    user: UserInterface
    comment: CommentInterface
    content: string
    createdAt: ISODateType

    // TODO: include properties on returned ReplyCommentDTO
    reactionCount: number
}

// user event service
export interface NotificationInterface extends UserGenericProperty {
    userEvent: UserEventEnum
    relatedTargetId: UserGenericProperty,
}

// user event service
// pk [user, post]
export interface ActivityInterface {
    id: string
    user: UserInterface
    post: PostInterface
    userEvent: UserEventEnum
    comment?: CommentInterface,
    commentReply?: ReplayCommentInterface,
    createdAt: ISODateType
}