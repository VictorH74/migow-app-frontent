"use client"
import Avatar from "@/components/Avatar"
import TextArea from "@/components/TextArea"
import useClientHTTP from "@/hooks/useClientHTTP"
import { UserInterface } from "@/interfaces/User"
import { serverFetch } from "@/lib/actions"
import { SxProps } from "@mui/material"
import React from "react"
import { twMerge } from "tailwind-merge"

interface CreateCommentInputProps {
    newCommentFunc: (content: string) => Promise<void>
    containerClassname?: string
    avatarSxProps?: SxProps
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
        await props.newCommentFunc(commentInputValue)
        setCommentInputValue("")
    }

    return (
        <div className={twMerge("flex", props.containerClassname)}>
            <Avatar
                image={avatarValue}
                avatarSxProps={{
                    width: 35,
                    height: 35,
                    fontSize: 15,
                    ...props.avatarSxProps
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