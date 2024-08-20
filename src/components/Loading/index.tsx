import Image from "next/image";
import circleImg from "@/assets/gradient-circle-img.png"

interface LoadingProps {
    width: number
    height: number
}

export default function Loading(props: LoadingProps) {
    return <Image {...props} alt="loading circle image" src={circleImg} />
}