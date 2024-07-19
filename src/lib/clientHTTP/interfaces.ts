import { ActivityInterface, CommentInterface, NotificationInterface, PostInterface, ReactionInterface, ReplayCommentInterface, UserInterface } from "@/interfaces";
import { PageResponse, RetrievedUserType, SimpleUserType } from "@/types";

export interface ClientHTTPInterface {
    getAllUserByUsernamePrefix(userId: string, usernamePrefix: string, pageNumber?: number, pageSize?: number): Promise<PageResponse<RetrievedUserType>>
    getAllFriendByUsernamePrefix(userId: string, usernamePrefix: string, pageNumber?: number, pageSize?: number): Promise<PageResponse<RetrievedUserType>>
    getUserByUsername(username: string): Promise<UserInterface>;
    getUserById(userId: string): Promise<UserInterface>;

    getUserActivities(userId: string, queryStr: string): Promise<PageResponse<ActivityInterface>> // pending
    getUserNotifications(userId: string): Promise<PageResponse<NotificationInterface>> // pending

    getAllCommonFriendCount(currentUserId: string, targetUserId: string): Promise<{ count: number }>
    // getProfileSettings(ownerId: string): Promise<AccountPreferencesSettings & PrivacySettings & NotificationsSettings> // pending

    checkIfUserBlockedUserId(targetUserId: string, currentUserId: string): Promise<{ status: boolean }> // pending
    checkIfUserHasFriendshipWith(targetUserId: string, currentUserId: string): Promise<{ isFriend: boolean }>

    getAllFriendRecentPost(userId: string, pageNumber?: number, pageSize?: number): Promise<PageResponse<PostInterface>>
    getAllFriendPopularPost(userId: string, pageNumber?: number, pageSize?: number): Promise<PageResponse<PostInterface>> // pending

    getAllPostComment(postId: string, pageNumber?: number, pageSize?: number): Promise<PageResponse<CommentInterface>>
    getAllCommentReply(commentId: string, pageNumber?: number, pageSize?: number): Promise<PageResponse<ReplayCommentInterface>>

    getAllTargetReaction(targetId: string): Promise<PageResponse<ReactionInterface>> // pending
}