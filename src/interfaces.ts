import { UserEventEnum, VisibilityEnum } from "./enums";
import { ISODateType } from "./types";

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
}

// posts service
// pk [user, comment]
export interface ReplayCommentInterface {
    id: string
    user: UserInterface
    comment: CommentInterface
    content: string
    createdAt: ISODateType
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