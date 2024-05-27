import React from "react"

interface PostBottomInfProps {
    reactionCount: number
    commentCount: number
    shareCount: number
    loadComments(): void
    recoveredAllComments: boolean
}

// const className = "hover:underline"

export default function PostBottomInf({ commentCount, reactionCount, shareCount, ...props }: PostBottomInfProps) {

    const className = React.useMemo(
        () => props.recoveredAllComments
            ? "" : "hover:underline"
        , [props.recoveredAllComments])

    return (
        <div className="flex justify-between text-sm px-4">
            <div className="flex gap-1">
                {reactionCount !== 0 && (
                    <button {...{ className }} >
                        {reactionCount} reactions
                    </button>
                )}
            </div>

            <div className="flex gap-1">
                {commentCount !== 0 && (
                    <button
                        disabled={props.recoveredAllComments}
                        onClick={props.loadComments}
                        {...{ className }}
                    >
                        {commentCount} comments
                    </button>
                )}

                {commentCount !== 0 && shareCount !== 0 && (
                    <div className="size-[6px] rounded-full bg-gray-500" />
                )}

                {shareCount !== 0 && (
                    <button {...{ className }} >
                        {shareCount} shares
                    </button>
                )}
            </div>
        </div>
    )
}