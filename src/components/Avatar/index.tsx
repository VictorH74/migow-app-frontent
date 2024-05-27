import { stringAvatar } from "@/util/functions";
import { SxProps } from "@mui/material";
import MuiAvatar from "@mui/material/Avatar";
import { twMerge } from "tailwind-merge";

interface AvatarProp {
    image: string
    avatarSxProps?: SxProps
    className?: string
}

export default function Avatar(props: AvatarProp) {

    const getImageProp = () => {
        try {
            new URL(props.image)
            return ({
                src: props.image
            })
        } catch (e) {
            return stringAvatar(props.image!, props.avatarSxProps)
        }
    }

    return (
        <MuiAvatar className={twMerge("mr-2", props.className)} {...getImageProp()} />
    )
}