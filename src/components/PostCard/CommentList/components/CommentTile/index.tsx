import Avatar from "@/components/Avatar";
import useCommentTile, { CommentTileProps } from "./useCommentTile";
import { SxProps } from "@mui/material";
import DisplayISODate from "@/components/DisplayDate";

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
                    image={props.user.profileImageUrl || props.user.name}
                    avatarSxProps={commentAvatarSxProps}
                />
                <div className="bg-gray-200 px-2 pb-2 rounded-md w-full">
                    <div className="flex items-center">
                        <p className="leading-[35px] font-semibold">
                            {props.user.username}
                        </p>
                        <DisplayISODate ISODate={props.createdAt} />
                    </div>
                    <p className="">{props.content}</p>
                </div>
            </div>

            {/* reply comments */}
            <ul className="mt-2">
                {
                    hook.replayComments.map(c => (
                        <li key={c.id} className="pl-[40px]" >
                            <div className="flex">
                                <Avatar
                                    image={c.user.profileImageUrl || c.user.name}
                                    avatarSxProps={replayCommentAvatarSxProps}
                                />
                                <div className="bg-gray-200 px-2 pb-2 rounded-md w-full">
                                    <div className="flex items-center">
                                        <p className="leading-[35px] font-semibold text-sm" >
                                            {c.user.username}
                                        </p>
                                        <DisplayISODate ISODate={props.createdAt} />
                                    </div>

                                    <p className="" >{c.content}</p>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </li>
    )
}