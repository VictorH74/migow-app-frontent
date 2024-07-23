/* eslint-disable react-hooks/exhaustive-deps */
import useClientHTTP from "@/hooks/useClientHTTP";
import { CommentInterface } from "@/interfaces/Comment";
import React from "react";

export interface CommentTileProps extends CommentInterface {
    highlightReplayComment?: CommentInterface.ReplyType
}

export default function useCommentTile(props: CommentTileProps) {
    const [pageNumber, setPageNumber] = React.useState<number>(0)
    const [replayComments, setReplayComments] = React.useState<CommentInterface.ReplyType[]>([])
    const [haveHighlightReplayComment, setHaveHighlightReplayComment] = React.useState(false)
    const clientHTTP = useClientHTTP();

    React.useEffect(() => {
        if (props.highlightReplayComment) {
            setReplayComments([props.highlightReplayComment!])
            setHaveHighlightReplayComment(true)
        }
    }, [])

    const loadReplayComments = async () => {
        const page = await clientHTTP.getAllCommentReply(props.id)
        setReplayComments(page.content)
        setPageNumber(prev => prev + 1)
    }

    return { replayComments, loadReplayComments }
}