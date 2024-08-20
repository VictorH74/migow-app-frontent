import CommentTile from "./components/CommentTile";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import usePost from "@/hooks/usePost";
import CreateCommentTile from "./components/CreateCommentTile";
import Loading from "@/components/Loading";


interface CommentListProps {
    postId: string
    commentCount: number
}

export default React.memo(function CommentList(props: CommentListProps) {
    const { comments, loadMoreComments } = usePost()

    const initialDataDate = React.useMemo(() => new Date().toISOString(), [])
    const { isLoading } = useQuery({
        queryKey: [props.postId + '-comments'],
        queryFn: loadMoreComments(initialDataDate),
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchInterval: false
    })

    if (isLoading) return <CommentListLoading />

    return (
        <>
            <CreateCommentTile
                avatarSxProps={{ marginTop: 0.3 }}
                containerClassname='mb-2'
            />
            <ul className="flex flex-col gap-3">
                {comments.map(c => (
                    <CommentTile
                        key={c.id} {...c}
                    // highlightReplyComment={c.id === props.highlightReplyComment?.comment ? props.highlightReplyComment : undefined} 
                    />
                ))}
            </ul>
            {comments.length > 0 && comments.length < props.commentCount && (
                <button className="font-semibold hover:underline m-auto w-full" onClick={loadMoreComments(initialDataDate)}>Load more 10 comments</button>
            )}
        </>

    )
})

const CommentListLoading = () => (
    <div className='p-5 grid place-items-center'>
        <Loading height={35} width={35} />
    </div>
)