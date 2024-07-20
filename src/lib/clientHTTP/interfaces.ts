import { ActivityInterface, CommentInterface, NotificationInterface, PostInterface, ReactionInterface, ReplayCommentInterface, UserInterface } from "@/interfaces";
import { GetAllPostFilterType, ResponsePageType, RetrievedUserType, SimpleUserType } from "@/types";

export interface ClientHTTPInterface {
    getAllUserByUsernamePrefix(userId: string, usernamePrefix: string, pageNumber?: number, pageSize?: number): Promise<ResponsePageType<RetrievedUserType>>
    getAllFriendByUsernamePrefix(userId: string, usernamePrefix: string, pageNumber?: number, pageSize?: number): Promise<ResponsePageType<SimpleUserType>>
    getUserByUsername(username: string): Promise<UserInterface>;
    getUserById(userId: string): Promise<UserInterface>;

    getUserActivities(userId: string, queryStr: string): Promise<ResponsePageType<ActivityInterface>> // pending
    getUserNotifications(userId: string): Promise<ResponsePageType<NotificationInterface>> // pending

    getAllCommonFriendCount(currentUserId: string, targetUserId: string): Promise<{ count: number }>
    // getProfileSettings(ownerId: string): Promise<AccountPreferencesSettings & PrivacySettings & NotificationsSettings> // pending

    checkIfUserBlockedUserId(targetUserId: string, currentUserId: string): Promise<{ status: boolean }> // pending
    checkIfUserHasFriendshipWith(targetUserId: string, currentUserId: string): Promise<{ isFriend: boolean }>

    getAllFriendPost(userId: string, filter: GetAllPostFilterType, pageNumber?: number, pageSize?: number): Promise<ResponsePageType<PostInterface>>

    getAllPostComment(postId: string, pageNumber?: number, pageSize?: number): Promise<ResponsePageType<CommentInterface>>
    getAllCommentReply(commentId: string, pageNumber?: number, pageSize?: number): Promise<ResponsePageType<ReplayCommentInterface>>

    getAllTargetReaction(targetId: string): Promise<ResponsePageType<ReactionInterface>> // pending
}