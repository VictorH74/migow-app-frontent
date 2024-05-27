import { CommentInterface, ReplayCommentInterface } from "@/interfaces";
import React from "react";

export interface CommentTileProps extends CommentInterface {
    highlightReplayComment?: ReplayCommentInterface
}

export default function useCommentTile(props: CommentTileProps) {
    const [page, setPage] = React.useState<number>(0)
    const [replayComments, setReplayComments] = React.useState<ReplayCommentInterface[]>([])
    const [haveHighlightReplayComment, setHaveHighlightReplayComment] = React.useState(false)

    React.useEffect(() => {
        if (props.highlightReplayComment) {
            setReplayComments([props.highlightReplayComment!])
            setHaveHighlightReplayComment(true)
        }
    }, [])

    const loadReplayComments = async () => {
        // TODO: fetch replay comments (page, size)
        // WITH CLIENTHTTP
        /*
        const response = await clientHTTP.fetchReplayComments(page, haveHighlightReplayComment)
        setReplayComments(prev => [...prev, ...response])
        setPage(prev => prev + 1)
        */
    }

    return { replayComments, loadReplayComments }
}