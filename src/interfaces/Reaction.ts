import { ReactionTypeEnum } from "@/enums";
import { UserGenericProperty } from "./global";

export interface ReactionInterface extends UserGenericProperty {
    targetId: string, // post or comment
}

export namespace ReactionInterface {
    export type TargetType = `${"post" | "comment" | "reply_comment"}_${string}`

    export type CreateUpdateType = {
        id: string
        type: ReactionTypeEnum
        target: TargetType
    }

    export type ReactionTypeCountsType = {
        likeReaction: number
        funnyReaction: number
        loveReaction: number
        sadReaction: number
        cuteReaction: number
        scaryReaction: number
    }

    export type SimpleType = {
        id: string
        target: string
        type: ReactionTypeEnum
        ownerId: string
    }
}