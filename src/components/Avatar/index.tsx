import { stringAvatar } from "@/util/functions";
import { SxProps } from "@mui/material";
import MuiAvatar from "@mui/material/Avatar";
import { twMerge } from "tailwind-merge";

interface AvatarProp {
    image?: string
    avatarSxProps?: SxProps
    className?: string
}

export default function Avatar(props: AvatarProp) {

    const getImageProp = () => {
        if (!props.image) return {}

        try {
            new URL(props.image)
            return ({
                src: props.image,
                sx: props.avatarSxProps
            })
        } catch (e) {
            return stringAvatar(props.image!, props.avatarSxProps)
        }
    }

    return (
        <MuiAvatar className={twMerge("mr-2", props.className)} {...getImageProp()} />
    )
}