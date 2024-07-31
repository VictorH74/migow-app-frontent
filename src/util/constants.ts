import { ReactionTypeEnum } from "@/enums";

export const EMOJIS: { emojiIcon: string, reactionType: ReactionTypeEnum }[] = [
    {
        emojiIcon: '👍',
        reactionType: ReactionTypeEnum.LIKE
    },
    {
        emojiIcon: '😂',
        reactionType: ReactionTypeEnum.FUNNY
    },
    {
        emojiIcon: '💙',
        reactionType: ReactionTypeEnum.LOVE
    },
    {
        emojiIcon: '😭',
        reactionType: ReactionTypeEnum.SAD
    },
    {
        emojiIcon: '😨',
        reactionType: ReactionTypeEnum.SCARY
    },
    {
        emojiIcon: '🥰',
        reactionType: ReactionTypeEnum.CUTE
    },
]