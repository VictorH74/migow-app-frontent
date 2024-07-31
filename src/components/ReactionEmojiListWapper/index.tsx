import { ReactionTypeEnum } from "@/enums";
import { EMOJIS } from "@/util/constants";
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
                        {EMOJIS.map(e => (
                            <li key={e.reactionType}>
                                <button onClick={() => props.onEmojiClick(e.reactionType)} className="hover:scale-125 duration-200" >
                                    {/* e.emojiIcon */}<p className="text-3xl">{e.emojiIcon}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}