import { UserInterface, ActivityInterface, NotificationInterface, PostInterface, CommentInterface, ReplayCommentInterface, ReactionInterface } from "@/interfaces";
import { ResponsePageType, RetrievedUserType, SimpleUserType } from "@/types";
import { ClientHTTPInterface } from "./interfaces";
import { AxiosInstance } from "axios"
import { customFetch } from "../actions";

export class ClientHTTPWithAxios implements ClientHTTPInterface {
    private axios: AxiosInstance

    constructor(axios: AxiosInstance) {
        this.axios = axios
    }

    setAuthorization(token: string) {
        console.log("SET headers.Authorization: ", token)
        this.axios.defaults.headers.Authorization = `Bearer ${token}`
    }

    async getAllUserByUsernamePrefix(userId: string, usernamePrefix: string = "", pageNumber: number = 0, pageSize: number = 10) {
        const res = await this.axios.get(`/u-s/users/by/${userId}?usernamePrefix=${usernamePrefix}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
        const { data } = res
        return data as ResponsePageType<RetrievedUserType>;
    }
    async getAllFriendByUsernamePrefix(userId: string, usernamePrefix: string = "", pageNumber: number = 0, pageSize: number = 10) {
        const res = await this.axios.get(`/u-s/users/${userId}/friendships?usernamePrefix=${usernamePrefix}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
        const { data } = res
        return data as ResponsePageType<RetrievedUserType>;
    }
    async getUserByUsername(username: string): Promise<UserInterface> {
        const res = await this.axios.get(`/u-s/users/username/${username}`)
        const { data } = res
        return data as UserInterface;
    }
    async getUserById(userId: string): Promise<UserInterface> {
        const res = await this.axios.get(`/u-s/users/${userId}`)
        const { data } = res
        return data as UserInterface;
    }
    getUserActivities(userId: string, queryStr: string): Promise<ResponsePageType<ActivityInterface>> {
        throw new Error("Method not implemented.");
    }
    getUserNotifications(userId: string): Promise<ResponsePageType<NotificationInterface>> {
        throw new Error("Method not implemented.");
    }
    async getAllCommonFriendCount(currentUserId: string, targetUserId: string): Promise<{ count: number; }> {
        const res = await this.axios.get(`/u-s/friendships/common?userId=${currentUserId}&targetId=${targetUserId}`)
        const { data } = res
        return data as { count: number; };
    }
    checkIfUserBlockedUserId(targetUserId: string, currentUserId: string): Promise<{ status: boolean; }> {
        throw new Error("Method not implemented.");
    }
    async checkIfUserHasFriendshipWith(targetUserId: string, currentUserId: string): Promise<{ isFriend: boolean; }> {
        const res = await this.axios.get(`/u-s/friendships/${targetUserId}/friendship-with/${currentUserId}`)
        const { data } = res
        return data as { isFriend: boolean; };
    }
    getAllFriendRecentPost(userId: string, pageNumber: number = 0, pageSize: number = 10): Promise<ResponsePageType<PostInterface>> {
        throw new Error("Method not implemented.");
    }
    getAllFriendPopularPost(userId: string, pageNumber: number = 0, pageSize: number = 10): Promise<ResponsePageType<PostInterface>> {
        throw new Error("Method not implemented.");
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

}