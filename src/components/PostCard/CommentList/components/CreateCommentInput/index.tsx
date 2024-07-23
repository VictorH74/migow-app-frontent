"use client"
import Avatar from "@/components/Avatar"
import TextArea from "@/components/TextArea"
import useClientHTTP from "@/hooks/useClientHTTP"
import React from "react"

interface CreateCommentInputProps {
    avatarValue: string
    postId: string
}

export default function CreateCommentInput(props: CreateCommentInputProps) {
    const [commentInputValue, setCommentInputValue] = React.useState("")
    const clientHTTP = useClientHTTP()

    const createComment = async () => {
        const createdComment = await clientHTTP.createComment({ content: commentInputValue, postId: props.postId })
        setCommentInputValue("")
    }

    return (
        <li className="px-4 mb-3">
            <div className="flex">
                <Avatar
                    image={props.avatarValue}
                    avatarSxProps={{
                        width: 35,
                        height: 35
                    }}
                />

                <div className="w-full">
                    <TextArea
                        className="w-full rounded-3xl border border-gray-400 hover:"
                        onChange={(value) => setCommentInputValue(value)}
                        value={commentInputValue}
                        placeholder="Comment something..."
                    />

                    <div className="flex items-center gap-1 text-sm">
                        {!!commentInputValue && (
                            <button className="bg-gradient text-white font-semibold px-4 py-1 rounded-lg" onClick={createComment}>Submit</button>
                        )}
                    </div>
                </div>

            </div>
        </li>
    )
}