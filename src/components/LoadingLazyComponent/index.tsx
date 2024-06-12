import Image from "next/image";
import circleImg from "@/assets/gradient-circle-img.png"

export default function LoadingLazyComponent() {
    return (
        <div className="fixed bottom-4 left-4 animate-spin size-fit">
            <Image width={50} height={50} alt="loading circle image" src={circleImg} />
        </div>
    )
}