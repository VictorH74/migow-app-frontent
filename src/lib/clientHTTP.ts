import { ActivityInterface, CommentInterface, NotificationInterface, PostInterface, ReactionInterface, ReplayCommentInterface, UserInterface } from "@/interfaces";
import { RetrievedUserType } from "@/types";

// TODO: userId param from getUsersByUsernamePrefix() to check if isFollowed by each returned user
interface ClientHTTPServiceInterface {
    findUsersByUsernamePrefix(userId: string, usernamePrefix: string, pageNumber: number, pageSize: number): Promise<RetrievedUserType[]> // ok
    findFollowersByUsernamePrefix(userId: string, usernamePrefix: string, pageNumber: number, pageSize: number): Promise<RetrievedUserType[]> // ok
    findUserByUsername(username: string): UserInterface; // ok
    findUserById(username: string): UserInterface; // ok
    findUserActivities(userId: string, queryStr: string): Promise<ActivityInterface[]>
    findUserNotifications(userId: string): Promise<NotificationInterface[]>

    findCommonFollowersCount(currentUserId: string, targetUserId: string): Promise<{ count: number }> // ok
    // getProfileSettings(ownerId: string): Promise<AccountPreferencesSettings & PrivacySettings & NotificationsSettings> // ok

    checkIfUserBlockedUserId(targetUserId: string, currentUserId: string): Promise<{ status: boolean }>
    checkIfUserIsFollowedByUserId(targetUserId: string, currentUserId: string): Promise<{ followed: boolean }> // ok

    findFollowersRecentPosts(userId: string, pageNumber: number, pageSize: number): Promise<PostInterface[]>
    findFollowersPopularPosts(userId: string, pageNumber: number, pageSize: number): Promise<PostInterface[]>

    findCommentsByPostId(postId: string, pageNumber: number, pageSize: number): Promise<CommentInterface[]>
    findReplyCommentsByCommentId(commentId: string, pageNumber: number, pageSize: number): Promise<ReplayCommentInterface[]>

    findReactionsByTargetId(targetId: string): Promise<ReactionInterface[]>
}