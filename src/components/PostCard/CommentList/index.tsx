import { CommentInterface, ReplayCommentInterface } from "@/interfaces";
import CommentTile from "./components/CommentTile";

interface CommentListProps {
    comments: CommentInterface[]
    commentCount: number
    highlightReplayComment?: ReplayCommentInterface
    loadComments(): void
}

export default function CommentList(props: CommentListProps) {

    return (
        <>
            <ul className="">
                {props.comments.map(c => (
                    <CommentTile key={c.id} {...c} highlightReplayComment={c.id === props.highlightReplayComment?.comment.id ? props.highlightReplayComment : undefined} />
                ))}
            </ul>
            {props.comments.length > 0 && props.comments.length < props.commentCount && (
                <button className="font-semibold hover:underline" onClick={props.loadComments}>Load more 10 comments</button>
            )}
        </>

    )
}