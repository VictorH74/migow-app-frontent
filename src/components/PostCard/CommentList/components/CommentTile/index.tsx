import Avatar from "@/components/Avatar";
import useCommentTile, { CommentTileProps } from "./useCommentTile";
import { SxProps } from "@mui/material";
import DisplayISODate from "@/components/DisplayDate";
import Link from "next/link";

export default function CommentTile(props: CommentTileProps) {
    const hook = useCommentTile(props)

    const commentAvatarSxProps: SxProps = {
        width: 35,
        height: 35
    }
    const replayCommentAvatarSxProps: SxProps = {
        width: 25,
        height: 25,
        fontSize: 12
    }

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
                        <button className="hover:underline">React</button>
                        <div className="size-1 rounded-full bg-gray-500" />
                        <button className="hover:underline">{props.reactCount}</button>

                        <div className="h-[15px] w-[1px] mx-1 bg-gray-500" />

                        <button className="hover:underline">Reply</button>
                        <div className="size-1 rounded-full bg-gray-500" />
                        <button className="hover:underline" onClick={hook.loadReplayComments}>{props.replyCommentCount} replies</button>
                    </div>
                </div>

            </div>


            {/* reply comments */}
            <ul className="mt-2">
                {
                    hook.replayComments.map(c => (
                        <li key={c.id} className="pl-[40px]" >
                            <div className="flex">
                                <Avatar
                                    image={c.owner.profileImageUrl || c.owner.name}
                                    avatarSxProps={replayCommentAvatarSxProps}
                                />
                                <div className="w-full">
                                    <div className="bg-gray-200 px-2 pb-2 rounded-md ">
                                        <div className="flex items-center">
                                            <Link href={"/in/profile/" + c.owner.username} className="leading-[35px] font-semibold text-sm hover:underline" >
                                                {c.owner.username}
                                            </Link>
                                            <DisplayISODate ISODate={props.createdAt} />
                                        </div>
                                        <p className="" >{c.content}</p>
                                    </div>

                                    <div className="border flex items-center gap-1 text-sm">
                                        <button className="hover:underline">React</button>
                                        <div className="size-1 rounded-full bg-gray-500" />
                                        <button className="hover:underline">{c.reactCount}</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </li>
    )
}