import { UserGenericProperty } from "./global";

export interface ReactionInterface extends UserGenericProperty {
    targetId: string, // post or comment
}

export namespace ReactionInterface {
    export type TargetType = `post_${string}` | `comment_${string}` | `reply_comment_${string}`

    export type ReactionTypeCountsType = {
        likeReaction: number
        funnyReaction: number
        loveReaction: number
        sadReaction: number
        cuteReaction: number
        scaryReaction: number
    }
}