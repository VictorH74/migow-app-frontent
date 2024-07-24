"use client"
import Avatar from "@/components/Avatar"
import TextArea from "@/components/TextArea"
import useClientHTTP from "@/hooks/useClientHTTP"
import { CommentInterface } from "@/interfaces/Comment"
import { UserInterface } from "@/interfaces/User"
import { serverFetch } from "@/lib/actions"
import React from "react"

interface CreateCommentInputProps {
    postId: string
    setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>
}

export default function CreateCommentInput(props: CreateCommentInputProps) {
    const [commentInputValue, setCommentInputValue] = React.useState("")
    const [avatarValue, setAvatarValue] = React.useState("")
    const clientHTTP = useClientHTTP()

    React.useEffect(() => {
        serverFetch<UserInterface.SimpleType>("/u-s/users/{tokenUserId}").then(user => {
            setAvatarValue(user.profileImageUrl || user.name)
        })
    }, [])

    const createComment = async () => {
        const createdComment = await clientHTTP.createComment({ content: commentInputValue, postId: props.postId })
        props.setComments(prev => [createdComment, ...prev])
        setCommentInputValue("")
    }

    return (
        <div className="flex px-4">
            <Avatar
                image={avatarValue}
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
    )
}