import { UserEventEnum } from "@/enums"
import { UserInterface } from "./User"
import { ISODateType } from "@/types"
import { PostInterface } from "./Post"
import { CommentInterface } from "./Comment"

export interface ActivityInterface {
    id: string
    user: UserInterface
    userEvent: UserEventEnum
    createdAt: ISODateType

    post: PostInterface
    comment?: CommentInterface,
    commentReply?: CommentInterface.ReplyType,
}