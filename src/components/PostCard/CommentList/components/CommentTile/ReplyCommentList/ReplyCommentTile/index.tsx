import Avatar from "@/components/Avatar";
import DisplayISODate from "@/components/DisplayDate";
import LoadingLazyComponent from "@/components/LoadingLazyComponent";
import ReactionUserListModal from "@/components/ReactionUserListModal";
import { CommentInterface } from "@/interfaces/Comment";
import { SxProps } from "@mui/material";
import Link from "next/link";
import React from "react";


interface ReplyCommentTileProps extends CommentInterface.ReplyType { }

const replayCommentAvatarSxProps: SxProps = {
    width: 25,
    height: 25,
    fontSize: 12
}

export default function ReplyCommentTile(props: ReplyCommentTileProps) {
    const [showReactionUsersModal, setShowReactionUsersModal] = React.useState(false)

    return (
        <li className="pl-[40px]" >
            <div className="flex">
                <Avatar
                    image={props.owner.profileImageUrl || props.owner.name}
                    avatarSxProps={replayCommentAvatarSxProps}
                />
                <div className="w-full">
                    <div className="bg-gray-200 px-2 pb-2 rounded-md ">
                        <div className="flex items-center">
                            <Link href={"/in/profile/" + props.owner.username} className="leading-[35px] font-semibold text-sm hover:underline" >
                                {props.owner.username}
                            </Link>
                            <DisplayISODate ISODate={props.createdAt} />
                        </div>
                        <p className="" >{props.content}</p>
                    </div>

                    <div className="border flex items-center gap-1 text-sm">
                        <button className="hover:underline">React</button>
                        <div className="size-1 rounded-full bg-gray-500" />
                        <button
                            className="hover:underline"
                            onClick={() => setShowReactionUsersModal(true)}
                            disabled={props.reactCount === 0}
                        >
                            {props.reactCount}
                        </button>
                    </div>
                </div>
            </div>
            <React.Suspense fallback={<LoadingLazyComponent />}>
                {showReactionUsersModal && (
                    <ReactionUserListModal
                        target={`comment_reply_${props.id}`}
                        reactionTypeCounts={props.reactionTypeCounts}
                        onClose={() => setShowReactionUsersModal(false)}
                    />
                )}
            </React.Suspense>
        </li>
    )
}