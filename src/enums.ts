export enum VisibilityEnum {
    PUBLIC = 1,
    FRIENDS = 2,
    NOBODY = 3
}

export enum AccountPrefSetsTheme {
    LIGHT = 1,
    DARK = 2,
    DEVICE = 3
}

export enum AccountPrefSetsOnlineUsersLimit {
    FIRST_6 = 1,
    FULL_HEIGHT = 2,
}

export enum UserEventEnum {
    COMMENT_REPLAY = 1,
    NEW_POST = 2,
    COMMENT_POST = 3,
    REACT_COMMENT = 4,
    REACT_POST = 5,
    SHARE_POST = 6
}

export enum ReactionTypeEnum {
    LIKE = 1, FUNNY = 2, LOVE = 3, SAD = 4, CUTE = 5, SCARY = 6
}

export enum FriendshipStatusEnum {
    IS_FRIEND = 1,
    IS_NOT_FRIEND = 2,
    PENDING = 3,
}