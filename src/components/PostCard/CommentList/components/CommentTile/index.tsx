import Avatar from "@/components/Avatar";
import useCommentTile, { CommentTileProps } from "./useCommentTile";
import { SxProps } from "@mui/material";
import DisplayISODate from "@/components/DisplayDate";
import Link from "next/link";
import ReplyCommentList from "./ReplyCommentList";
import React from "react";
import LoadingLazyComponent from "@/components/LoadingLazyComponent";
import ReactionUserListModal from "@/components/ReactionUserListModal";


const commentAvatarSxProps: SxProps = {
    width: 35,
    height: 35
}

export default function CommentTile(props: CommentTileProps) {
    const hook = useCommentTile(props)

    return (
        <li className="px-4">
            <div className="flex">
                <Avatar
                    image={props.owner.profileImageUrl || props.owner.name}
                    avatarSxProps={commentAvatarSxProps}
                />
                <div className="w-full">
                    <div className="bg-gray-200 px-2 pb-2 rounded-md ">
                        <div className="flex items-center">
                            <Link href={"/in/profile/" + props.owner.username} className="leading-[35px] font-semibold hover:underline">
                                {props.owner.username}
                            </Link>
                            <DisplayISODate ISODate={props.createdAt} />
                        </div>
                        <p className="">{props.content}</p>
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                        <button
                            className="hover:underline"
                        >
                            React
                        </button>
                        <div className="size-1 rounded-full bg-gray-500" />
                        <button
                            onClick={() => hook.setShowReactionUsersModal(true)}
                            className="hover:underline"
                            disabled={props.reactCount === 0}
                        >
                            {props.reactCount}
                        </button>

                        <div className="h-[15px] w-[1px] mx-1 bg-gray-500" />

                        <button className="hover:underline">Reply</button>
                        <div className="size-1 rounded-full bg-gray-500" />
                        <button
                            className="hover:underline"
                            onClick={() => hook.setShowReplyComments(true)}
                            disabled={props.replyCommentCount === 0}
                        >
                            {props.replyCommentCount} replies
                        </button>
                    </div>
                </div>

            </div>

            {hook.showReplyComments && (
                <ReplyCommentList
                    commentId={props.id}
                    replyComments={hook.replayComments}
                    // highlightReplayComment={props.highlightReplayComment}
                    loadReplyComments={hook.loadMoreReplyComments}
                />
            )}

            <React.Suspense fallback={<LoadingLazyComponent />}>
                {hook.showReactionUsersModal && (
                    <ReactionUserListModal
                        target={`comment_${props.id}`}
                        reactionTypeCounts={props.reactionTypeCounts}
                        onClose={() => hook.setShowReactionUsersModal(false)}
                    />
                )}
            </React.Suspense>
        </li>
    )
}