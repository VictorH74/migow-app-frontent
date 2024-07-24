import { GetAllPostFilterType, ISODateRangeFilter } from "@/types";
import { ClientHTTPInterface } from "./interfaces";
import { serverFetch } from "../actions";
import { UserInterface } from "@/interfaces/User";
import { CommentInterface } from "@/interfaces/Comment";
import { PostInterface } from "@/interfaces/Post";
import { NotificationInterface } from "@/interfaces/Notification";
import { ActivityInterface } from "@/interfaces/Activity";
import { ResponsePageInterface } from "@/interfaces/ResponsePage";
import { ReactionInterface } from "@/interfaces/Reaction";
import { parsePaginationToParams } from "@/util/functions";
import { ReactionTypeEnum } from "@/enums";

export class clientHTTPWithStandartFetch implements ClientHTTPInterface {
    async getAllUserByUsernamePrefix(userId: string, usernamePrefix: string = "", pagination?: ResponsePageInterface.PaginationType) {
        return serverFetch<ResponsePageInterface<UserInterface.RetrievedType>>(
            `/u-s/users/by/${userId}?usernamePrefix=${usernamePrefix}&${parsePaginationToParams(pagination)}`)
    }
    async getAllFriendByUsernamePrefix(userId: string, usernamePrefix: string = "", pagination?: ResponsePageInterface.PaginationType) {
        return serverFetch<ResponsePageInterface<UserInterface.RetrievedType>>(
            `/u-s/users/${userId}/friendships?usernamePrefix=${usernamePrefix}&${parsePaginationToParams(pagination)}`)
    }
    async getUserByUsername(username: string): Promise<UserInterface> {
        return serverFetch<UserInterface>(`/u-s/users/username/${username}`)
    }
    async getUserById(userId: string): Promise<UserInterface> {
        return serverFetch<UserInterface>(`/u-s/users/${userId}`)
    }
    async getAllCommonFriendCount(targetUserId: string): Promise<{ count: number; }> {
        return serverFetch<{ count: number; }>(
            `/u-s/friendships/common?targetId=${targetUserId}`)
    }

    getUserActivities(userId: string, queryStr: string): Promise<ResponsePageInterface<ActivityInterface>> {
        throw new Error("Method not implemented.");
    }
    getUserNotifications(userId: string): Promise<ResponsePageInterface<NotificationInterface>> {
        throw new Error("Method not implemented.");
    }

    checkIfUserBlockedUserId(targetUserId: string, currentUserId: string): Promise<{ status: boolean; }> {
        throw new Error("Method not implemented.");
    }
    async checkIfUserHasFriendshipWith(targetUserId: string, currentUserId: string): Promise<{ isFriend: boolean; }> {
        return serverFetch<{ isFriend: boolean; }>(
            `/u-s/friendships/${targetUserId}/friendship-with/${currentUserId}`)
    }

    getAllFriendPost(filter: GetAllPostFilterType, pagination?: ResponsePageInterface.PaginationType): Promise<ResponsePageInterface<PostInterface>> {
        return serverFetch<ResponsePageInterface<PostInterface>>(
            `/p-s/posts/${filter}?${parsePaginationToParams(pagination)}`, { next: { tags: [filter + '-posts'] } })
    }
    getAllPostComment(postId: string, pagination?: ResponsePageInterface.PaginationType): Promise<ResponsePageInterface<CommentInterface>> {
        return serverFetch<ResponsePageInterface<CommentInterface>>(
            `/p-s/comments/${postId}?${parsePaginationToParams(pagination)}`, { next: { tags: [postId + "-comments"] } })
    }
    getAllCommentReply(commentId: string, pagination?: ResponsePageInterface.PaginationType): Promise<ResponsePageInterface<CommentInterface.ReplyType>> {
        return serverFetch<ResponsePageInterface<CommentInterface.ReplyType>>(
            `/p-s/reply-comments/${commentId}?${parsePaginationToParams(pagination)}`, { next: { tags: [commentId + "-replies"] } })
    }

    createPost(post: PostInterface.CreateType): Promise<PostInterface> {

        const { mediaURLs } = post
        // TODO: upload media list to firebase

        return serverFetch<PostInterface>(`/p-s/posts`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        })
    }

    async createComment(comment: CommentInterface.CreateType): Promise<CommentInterface> {
        const createdComment = await serverFetch<CommentInterface>(`/p-s/comments`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        },
            comment.postId + "-comments"
        )
        return createdComment;
    }
    createReplyComment(reply: CommentInterface.CreateReplyType): Promise<CommentInterface.ReplyType> {
        return serverFetch<CommentInterface.ReplyType>(`/p-s/reply-comments`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reply),
        })
    }

    getCommentById(commentId: string): Promise<CommentInterface> {
        return serverFetch<CommentInterface>(`/p-s/comments/${commentId}`);
    }

    getAllReactionUser(target: ReactionInterface.TargetType, usernamePrefix?: string, reactionTypeCode?: ReactionTypeEnum, pagination?: ResponsePageInterface.PaginationType): Promise<ResponsePageInterface<UserInterface.SimpleType>> {
        let url = `p-s/reactions/with-target/${target}`

        if (reactionTypeCode) url += `/by-reaction-type/${reactionTypeCode}`

        return serverFetch<ResponsePageInterface<UserInterface.SimpleType>>(
            `/${url}?usernamePrefix=${usernamePrefix}&${parsePaginationToParams(pagination)}`)
    }
}