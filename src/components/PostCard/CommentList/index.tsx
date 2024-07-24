import { CommentInterface } from "@/interfaces/Comment";
import CommentTile from "./components/CommentTile";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import circleImg from "@/assets/gradient-circle-img.png"
import Image from "next/image";


interface CommentListProps {
    postId: string
    comments: CommentInterface[]
    commentCount: number
    highlightReplayComment?: CommentInterface.ReplyType
    loadComments(endDate: string): () => Promise<void>
}

export default React.memo(function CommentList(props: CommentListProps) {
    const initialDataDate = React.useMemo(() => new Date().toISOString(), [])
    const { isLoading } = useQuery({
        queryKey: [props.postId + '-comments'],
        queryFn: props.loadComments(initialDataDate),
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchInterval: false
    })

    if (isLoading) return <CommentListLoading />

    return (
        <>
            <ul className="">
                {props.comments.map(c => (
                    <CommentTile key={c.id} {...c} highlightReplayComment={c.id === props.highlightReplayComment?.comment ? props.highlightReplayComment : undefined} />
                ))}
            </ul>
            {props.comments.length > 0 && props.comments.length < props.commentCount && (
                <button className="font-semibold hover:underline" onClick={() => props.loadComments(initialDataDate)}>Load more 10 comments</button>
            )}
        </>

    )
})

const CommentListLoading = () => (
    <div className='p-5 grid place-items-center'>
      <Image width={35} height={35} alt="loading circle image" src={circleImg} />
    </div>
  )