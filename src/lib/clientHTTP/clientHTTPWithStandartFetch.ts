import { UserInterface, ActivityInterface, NotificationInterface, PostInterface, CommentInterface, ReplayCommentInterface, ReactionInterface } from "@/interfaces";
import { GetAllPostFilterType, ResponsePageType, RetrievedUserType, SimpleUserType } from "@/types";
import { ClientHTTPInterface } from "./interfaces";
import { customFetch } from "../actions";

export class clientHTTPWithStandartFetch implements ClientHTTPInterface {
    async getAllUserByUsernamePrefix(userId: string, usernamePrefix: string = "", pageNumber: number = 0, pageSize: number = 10) {
        return customFetch<ResponsePageType<RetrievedUserType>>(
            `/u-s/users/by/${userId}?usernamePrefix=${usernamePrefix}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }

    async getAllFriendByUsernamePrefix(userId: string, usernamePrefix: string = "", pageNumber: number = 0, pageSize: number = 10) {
        return customFetch<ResponsePageType<RetrievedUserType>>(
            `/u-s/users/${userId}/friendships?usernamePrefix=${usernamePrefix}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }

    async getUserByUsername(username: string): Promise<UserInterface> {
        return customFetch<UserInterface>(`/u-s/users/username/${username}`)
    }

    async getUserById(userId: string): Promise<UserInterface> {
        return customFetch<UserInterface>(`/u-s/users/${userId}`)
    }

    getUserActivities(userId: string, queryStr: string): Promise<ResponsePageType<ActivityInterface>> {
        throw new Error("Method not implemented.");
    }

    getUserNotifications(userId: string): Promise<ResponsePageType<NotificationInterface>> {
        throw new Error("Method not implemented.");
    }

    async getAllCommonFriendCount(currentUserId: string, targetUserId: string): Promise<{ count: number; }> {
        return customFetch<{ count: number; }>(
            `/u-s/friendships/common?userId=${currentUserId}&targetId=${targetUserId}`)
    }

    checkIfUserBlockedUserId(targetUserId: string, currentUserId: string): Promise<{ status: boolean; }> {
        throw new Error("Method not implemented.");
    }

    async checkIfUserHasFriendshipWith(targetUserId: string, currentUserId: string): Promise<{ isFriend: boolean; }> {
        return customFetch<{ isFriend: boolean; }>(
            `/u-s/friendships/${targetUserId}/friendship-with/${currentUserId}`)
    }

    getAllFriendPost(userId: string, filter: GetAllPostFilterType, pageNumber: number = 0, pageSize: number = 10): Promise<ResponsePageType<PostInterface>> {
        return customFetch<ResponsePageType<PostInterface>>(
            `/p-s/posts/${userId}/${filter}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }

    getAllPostComment(postId: string, pageNumber: number = 0, pageSize: number = 10): Promise<ResponsePageType<CommentInterface>> {
        throw new Error("Method not implemented.");
    }

    getAllCommentReply(commentId: string, pageNumber: number = 0, pageSize: number = 10): Promise<ResponsePageType<ReplayCommentInterface>> {
        throw new Error("Method not implemented.");
    }

    getAllTargetReaction(targetId: string): Promise<ResponsePageType<ReactionInterface>> {
        throw new Error("Method not implemented.");
    }

    async logOut() {
        
    }

}