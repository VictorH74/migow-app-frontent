import { ReactionTypeEnum } from "@/enums";

export const REACTION_ARRAY = [
    { name: "Like", icon: "👍", type: ReactionTypeEnum.LIKE },
    { name: "Funny", icon: "😂", type: ReactionTypeEnum.FUNNY },
    { name: "Love", icon: "💙", type: ReactionTypeEnum.LOVE },
    { name: "Sad", icon: "😭", type: ReactionTypeEnum.SAD },
    { name: "Scary", icon: "😨", type: ReactionTypeEnum.SCARY },
    { name: "Cute", icon: "🥰", type: ReactionTypeEnum.CUTE },
]

export const REACTION_TYPE_BY_EMOJI = {
    '👍': ReactionTypeEnum.LIKE,
    '😂': ReactionTypeEnum.FUNNY,
    '💙': ReactionTypeEnum.LOVE,
    '😭': ReactionTypeEnum.SAD,
    '😨': ReactionTypeEnum.SCARY,
    '🥰': ReactionTypeEnum.CUTE,
}

export const EMOJI_BY_REACTION_TYPE = (() => {
    const obj: Record<any, any> = {}
    Object.entries(REACTION_TYPE_BY_EMOJI).forEach(([k, v]) => obj[v] = k)
    return obj as Record<ReactionTypeEnum, keyof typeof REACTION_TYPE_BY_EMOJI>
})()
