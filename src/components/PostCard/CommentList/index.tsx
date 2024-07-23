import { CommentInterface } from "@/interfaces/Comment";
import CommentTile from "./components/CommentTile";
import React, { use } from "react";
import { serverFetch } from "@/lib/actions";
import { UserInterface } from "@/interfaces/User";
import CreateCommentInput from "./components/CreateCommentInput";


interface CommentListProps {
    postId: string
    comments: CommentInterface[]
    commentCount: number
    highlightReplayComment?: CommentInterface.ReplyType
    loadComments(endDate?: string): void
}

export default React.memo(function CommentList(props: CommentListProps) {
    const currentUser = use(serverFetch<UserInterface.SimpleType>("/u-s/users/{tokenUserId}"))
    const initialDataDate = React.useMemo(() => new Date().toISOString(), [])

    return (
        <>
            <ul className="">
                <CreateCommentInput postId={props.postId} avatarValue={currentUser.profileImageUrl || currentUser.name} />

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