import { CommentInterface } from "@/interfaces/Comment"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import ReplyCommentTile from "./ReplyCommentTile"
import Loading from "@/components/Loading";


interface ReplyCommentList {
    commentId: string
    replyComments: CommentInterface.ReplyType[]
    loadReplyComments(endDate: string): () => Promise<void>
}

// TODO: load 2 lasts replies, then display btn with label 'Load previous replies'
export default function ReplyCommentList(props: ReplyCommentList) {
    const initialDataDate = React.useMemo(() => new Date().toISOString(), [])
    const { isLoading } = useQuery({
        queryKey: [props.commentId + '-replies'],
        queryFn: props.loadReplyComments(initialDataDate),
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchInterval: false
    })

    if (isLoading) return <ReplyCommentListLoading />

    return (
        <ul className="mt-2">
            {
                props.replyComments.map(c => (
                    <ReplyCommentTile key={c.id} {...c} />
                ))
            }
        </ul>
    )
}

const ReplyCommentListLoading = () => (
    <div className='p-5 grid place-items-center'>
        <Loading height={35} width={35} />
    </div>
)