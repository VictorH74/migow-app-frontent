import { ReactionTypeEnum } from "@/enums";
import { REACTION_ARRAY, REACTION_TYPE_BY_EMOJI } from "@/util/constants";
import React from "react";

interface ReactionEmojiListWapperProps extends React.PropsWithChildren {
    onEmojiClick(reactionType: ReactionTypeEnum): void
}

export default function ReactionEmojiListWapper(props: ReactionEmojiListWapperProps) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [showEmojis, setShowEmojis] = React.useState(false)
    const hiddenEmojisRef = React.useRef<ReturnType<typeof setTimeout>>()

    const showEmojisFunc = () => {
        if (showEmojis) {
            clearTimeout(hiddenEmojisRef.current)
            return;
        }

        setShowEmojis(true)

    }

    const hiddenEmojisFunc = () => {
        hiddenEmojisRef.current = setTimeout(() => setShowEmojis(false), 500);
    }

    return (
        <div ref={containerRef} className="relative" onMouseOver={showEmojisFunc} onMouseLeave={hiddenEmojisFunc}>
            {props.children}

            {
                showEmojis && (
                    <ul className="absolute bottom-full w-auto flex flex-row gap-1 bg-white p-3 rounded-xl shadow-lg">
                        {REACTION_ARRAY.map(reaction => (
                            <li key={reaction.type}>
                                <button onClick={() => props.onEmojiClick(reaction.type)} className="hover:scale-125 duration-200" >
                                    <p className="text-3xl">{reaction.icon}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}