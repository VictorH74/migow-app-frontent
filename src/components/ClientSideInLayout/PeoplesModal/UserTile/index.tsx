import Avatar from "@/components/Avatar";
import { RetrievedUserType } from "@/types";
import { twMerge } from "tailwind-merge";

interface UserTileProps extends RetrievedUserType { }

export default function UserTile(props: UserTileProps) {
    return (
        <li className="flex justify-between px-1 py-2">
            <div className="flex items-center hover:cursor-pointer group">
                <Avatar image={props.profileImageUrl || props.name} />
                <p className="group-hover:underline font-semibold text-gray-600">{props.username}</p>
            </div>

            <button className={twMerge("py-2 px-4 font-semibold rounded-full", props.isFriend ? "bg-gray-200 text-gray-500" : "bg-gradient text-white")}>{props.isFriend ? "Unfollow" : "Follow"}</button>
        </li>
    )
}