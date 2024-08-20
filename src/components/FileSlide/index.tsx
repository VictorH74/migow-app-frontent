import { MediaInterface } from "@/interfaces/Media";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

interface FileSlideProps {
    files: (File | MediaInterface)[]
}

export default function FileSlide(props: FileSlideProps) {
    const sliderContainerRef = React.useRef<HTMLUListElement>(null);

    const [currentFileIndex, setCurrentFileIndex] = React.useState<number>(0);

    const screeshotURLs = React.useMemo(() => props.files.map(file => ({
        url: file instanceof File ? URL.createObjectURL(file) : file.url,
        type: file.type,
        name: file.name,
    })), [props.files])

    React.useEffect(() => {
        if (!sliderContainerRef.current) return

        const sliderContainer = sliderContainerRef.current
        const left = sliderContainer.clientWidth * currentFileIndex

        sliderContainer.scrollTo({ left, behavior: 'smooth' })
    }, [currentFileIndex]);

    const changeCurrentFileIndex = (index: number) => setCurrentFileIndex(index)

    const previousSlide = React.useCallback(() => {
        if (currentFileIndex == 0) return;
        setCurrentFileIndex(prev => prev - 1)
    }, [currentFileIndex])
    const nextSlide = React.useCallback(() => {
        if (currentFileIndex + 1 >= props.files.length) return;
        setCurrentFileIndex(prev => prev + 1)
    }, [currentFileIndex, props.files])

    return (
        <div className="relative">
            <ul
                ref={sliderContainerRef}
                className="flex w-full overflow-hidden"
            >
                {screeshotURLs.map((file, index) => {
                    return (
                        <li
                            key={index}
                            className="w-full flex-shrink-0"
                        >
                            {file.type === "video/mp4" ?
                                <video
                                    src={file.url}
                                    className="size-full object-contain max-h-[700px]"
                                    controls
                                />
                                : <Image
                                    width={780}
                                    height={300}
                                    src={file.url}
                                    alt={file.name}
                                    className="size-full object-contain max-h-[700px]"
                                />
                            }
                        </li>
                    )
                })}
                {props.files.length > 1 && (
                    <span
                        className="absolute bottom-4 inset-x-0 flex gap-3 justify-center"
                    >
                        {props.files.map((_, i) => (
                            <button key={i}
                                className={twMerge("size-3 rounded-full bg-cyan-400 duration-200", currentFileIndex == i ? "bg-blue-500" : undefined)}
                                onClick={() => changeCurrentFileIndex(i)}
                                type="button"
                            />
                        ))}
                    </span>
                )}

            </ul>
        </div>
    )
}