"use client"
import ModalContainer from "@/components/ModalContainer";
import Avatar from "@/components/Avatar";
import React from "react";
import SymetricHorizontalButtonList from "@/components/SymetricHorizontalButtonList";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { SxProps } from "@mui/material";
import { UserInterface } from "@/interfaces/User";

interface AddNewPostModalProps {
    onClose(): void
}

// temp
const currentUser: UserInterface = {
    createdAt: "",
    email: "",
    id: "aa",
    friendships: [],
    name: "victor almeidaa",
    username: "vyctor"
}

const avatarSxProps: SxProps = {
    height: 50,
    width: 50,
}

export default function AddNewPostModal(props: AddNewPostModalProps) {
    const publicBtnRef = React.useRef<HTMLButtonElement | null>(null)
    const justFriendsBtnRef = React.useRef<HTMLButtonElement | null>(null)
    const [postVisibility, setPostVisibility] = React.useState<0 | 1>(0)
    const [videoURL, setVideoURL] = React.useState<string | undefined>()
    const [imageURLs, setImageURLs] = React.useState<string[]>([])

    const [content, setContent] = React.useState("");
    const textareRef = React.useRef<HTMLTextAreaElement>(null);

    const btnData = React.useMemo(() => [
        {
            ref: publicBtnRef,
            label: "Public",
            selected: postVisibility === 0,
            onClick: () => setPostVisibility(0)
        },
        {
            ref: justFriendsBtnRef,
            label: "Just Friends",
            selected: postVisibility === 1,
            onClick: () => setPostVisibility(1)
        },
    ], [postVisibility])

    React.useEffect(() => {
        if (textareRef.current && !content) {
            textareRef.current.style.height = "auto";
        }
    }, [content]);


    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            setContent((prevText) => {
                return prevText + "\n";
            });
            const height = e.currentTarget.scrollHeight;
            e.currentTarget.style.height = `${height + 24}px`;
            return;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;

        setContent(value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (!files) return

        const tempImgURLs: string[] = []
        let videoFile: File | undefined;

        if (files.length === 1 && files[0].type === "video/mp4") {
            videoFile = files[0];
        } else {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
                    tempImgURLs.push(URL.createObjectURL(file));
                    continue
                }
            }
        }

        if (files.length > 1 && tempImgURLs.length === 0) {
            alert("You can select just one video file!")
            return;
        }

        if (videoFile) {
            const videoURL = URL.createObjectURL(videoFile);
            setVideoURL(videoURL);
        }
        else if (tempImgURLs.length > 0) {
            setImageURLs(tempImgURLs)
        }
        else {
            alert("Error :(")
        }
    }


    const handleSubmit = async (event?: React.FormEvent) => {
        event?.preventDefault();

        if (!content) return;
        setContent(() => "");

        const formattedContent = content.split("\n").join("<br>")
    }

    return (
        <ModalContainer
            modalClassName="max-w-[900px] h-fit max-h-full overflow-auto"
            onClose={props.onClose}

        >
            <div className="p-4 flex flex-col items-center gap-3 h-full w-full">
                <h1 className="w-fit text-2xl text-gray-500 font-semibold text-gradient tracking-wider ">
                    New Post
                </h1>
                <form className="w-full grow overflow-auto flex flex-col gap-3" action="">

                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <Avatar
                                image={currentUser.profileImageUrl || currentUser.name}
                                avatarSxProps={avatarSxProps}
                            />
                            <p className="text-lg text-gray-500" >{currentUser.name}</p>
                        </div>
                        <SymetricHorizontalButtonList btnData={btnData} renderDelay={200} buttonClassName="px-6" />
                    </div>

                    <div className="min-h-[300px]">
                        <textarea
                            ref={textareRef}
                            rows={1}
                            className="p-3 w-full text-gray-500 outline-none resize-none overflow-hidden min-h-[36px] max-h-full xoverflow-y-auto"
                            placeholder="What are you thinking about?"
                            value={content}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>


                    <div className="grid">

                        {!videoURL && imageURLs.length === 0 && (
                            <>
                                <label htmlFor="media-upload" className="text-gray-500 w-fit hover:cursor-pointer">
                                    <AddPhotoAlternateIcon sx={{ fontSize: 40 }} />
                                </label>
                                <input
                                    type="file"
                                    name=""
                                    accept=".jpg,.jpeg,.webp,.png,.mp4"
                                    id="media-upload"
                                    className="absolute opacity-0 pointer-events-none"
                                    onChange={handleFileInputChange}
                                    multiple
                                />
                            </>
                        )}

                        {
                            videoURL && (
                                <video src={videoURL} />
                            )
                        }

                        {/*  */}

                        <div className="w-full h-[2px] bg-gray-500 my-4" />

                        <div className="text-right">
                            <button type="button" className="py-3 px-10 bg-gradient text-white font-semibold rounded-full">
                                Create Post
                            </button>
                        </div>
                    </div>



                </form>
            </div>

        </ModalContainer>
    )

}