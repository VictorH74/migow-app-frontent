import { ISODateType } from "@/types"
import { UserInterface } from "./User"
import { PostInterface } from "./Post"
import { ReactionInterface } from "./Reaction"

export interface CommentInterface {
    id: string
    owner: UserInterface.SimpleType
    content: string
    createdAt: ISODateType

    postId: Pick<PostInterface, "id">

    reactCount: number
    replyCommentCount: number
    reactionTypeCounts: ReactionInterface.ReactionTypeCountsType

}

export namespace CommentInterface {
    export type ReplyType = {
        id: string
        owner: UserInterface.SimpleType
        content: string
        createdAt: ISODateType

        comment: string

        reactCount: number
        reactionTypeCounts: ReactionInterface.ReactionTypeCountsType
    }

    export type CreateReplyType = {
        content: string
        commentId: string
    }

    export type CreateType = {
        content: string;
        postId: string;
    }
}