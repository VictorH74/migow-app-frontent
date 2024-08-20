import { FriendshipStatusEnum, ReactionTypeEnum } from "@/enums";
import { ActivityInterface } from "@/interfaces/Activity";
import { CommentInterface } from "@/interfaces/Comment";
import { NotificationInterface } from "@/interfaces/Notification";
import { PostInterface } from "@/interfaces/Post";
import { ReactionInterface } from "@/interfaces/Reaction";
import { ResponsePageInterface } from "@/interfaces/ResponsePage";
import { UserInterface } from "@/interfaces/User";
import { GetAllPostFilterType, ISODateRangeFilter } from "@/types";

export interface ClientHTTPInterface {
    getAllUserByUsernamePrefix(userId: string, usernamePrefix: string, pagination?: ResponsePageInterface.PaginationType): Promise<ResponsePageInterface<UserInterface.RetrievedType>>
    getAllFriendByUsernamePrefix(userId: string, usernamePrefix: string, pagination?: ResponsePageInterface.PaginationType): Promise<ResponsePageInterface<UserInterface.SimpleType>>
    getUserByUsername(username: string): Promise<UserInterface>;
    getUserById(userId: string): Promise<UserInterface>;

    getUserActivities(userId: string, queryStr: string): Promise<ResponsePageInterface<ActivityInterface>> // pending
    getUserNotifications(userId: string): Promise<ResponsePageInterface<NotificationInterface>> // pending

    getAllCommonFriendCount(targetUserId: string): Promise<{ count: number }>
    // getProfileSettings(ownerId: string): Promise<AccountPreferencesSettings & PrivacySettings & NotificationsSettings> // pending

    checkIfUserBlockedUserId(targetUserId: string, currentUserId: string): Promise<{ status: boolean }> // pending
    checkIfUserHasFriendshipWith(targetUserId: string, currentUserId: string): Promise<{ friendshipStatus: FriendshipStatusEnum; }>

    getAllFriendPost(filter: GetAllPostFilterType, pagination?: ResponsePageInterface.PaginationType): Promise<ResponsePageInterface<PostInterface>>

    getCommentById(commentId: string): Promise<CommentInterface>

    getAllPostComment(postId: string, pagination?: ResponsePageInterface.PaginationType): Promise<ResponsePageInterface<CommentInterface>>
    getAllCommentReply(commentId: string, pagination?: ResponsePageInterface.PaginationType): Promise<ResponsePageInterface<CommentInterface.ReplyType>>

    createPost(post: PostInterface.CreateType): Promise<PostInterface>
    createComment(comment: CommentInterface.CreateType): Promise<CommentInterface>
    createReplyComment(reply: CommentInterface.CreateReplyType): Promise<CommentInterface.ReplyType>

    getAllReactionUser(target: ReactionInterface.TargetType, usernamePrefix?: string, reactionTypeCode?: ReactionTypeEnum, pagination?: ResponsePageInterface.PaginationType): Promise<ResponsePageInterface<UserInterface.ReactionUserType>>
    // getAllTargetReactionUser(target: string): Promise<ResponsePageInterface<UserInterface.SimpleType>>
}