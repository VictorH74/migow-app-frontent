import { SxProps } from "@mui/material"
import CreateCommentInput from "../CreateCommentInput"

interface CreateReplyCommentTileProps {
    containerClassname?: string
    avatarSxProps?: SxProps
    createReplyFunc(content: string): Promise<void>
}

export default function CreateReplyCommentTile(props: CreateReplyCommentTileProps) {
    const handleSubmit = async (content: string) => props.createReplyFunc(content)

    return (
        <CreateCommentInput
            onSubmit={handleSubmit}
            avatarSxProps={props.avatarSxProps}
            containerClassname={props.containerClassname}
        />
    )
}