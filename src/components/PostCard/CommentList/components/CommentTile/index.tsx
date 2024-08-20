import Avatar from "@/components/Avatar";
import useCommentTile, { CommentTileProps } from "./useCommentTile";
import { SxProps } from "@mui/material";
import DisplayISODate from "@/components/DisplayDate";
import Link from "next/link";
import ReplyCommentList from "./ReplyCommentList";
import React from "react";
import LoadingLazyComponent from "@/components/LoadingLazyComponent";
import ReactionUserListModal from "@/components/ReactionUserListModal";
import CreateCommentInput from "../CreateCommentInput";
import CreateReplyCommentTile from "../CreateReplyCommentTile";


const commentAvatarSxProps: SxProps = {
    width: 35,
    height: 35,
    fontSize: 15
}

export const replyCommentAvatarSxProps: SxProps = {
    width: 30,
    height: 30,
    fontSize: 13
}

export default function CommentTile(props: CommentTileProps) {
    const hook = useCommentTile(props)

    return (
        <li>
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

                        <button
                            className="hover:underline"
                            onClick={() => hook.setShowReplyInput(true)}
                        >
                            Reply
                        </button>
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



            <div className="pl-[40px]">
                {
                    hook.showReplyInput && (
                        <CreateReplyCommentTile
                            avatarSxProps={{...replyCommentAvatarSxProps, marginTop: 0.5}}
                            containerClassname="mt-2"
                            createReplyFunc={hook.createReply}
                        />
                    )
                }
                {hook.showReplyComments && (
                    <ReplyCommentList
                        commentId={props.id}
                        replyComments={hook.replyComments}
                        // highlightReplyComment={props.highlightReplyComment}
                        loadReplyComments={hook.loadMoreReplyComments}
                    />
                )}
            </div>



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