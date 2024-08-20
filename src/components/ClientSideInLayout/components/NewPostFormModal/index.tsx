"use client"
import ModalContainer from "@/components/ModalContainer";
import Avatar from "@/components/Avatar";
import React from "react";
import SymetricHorizontalButtonList from "@/components/SymetricHorizontalButtonList";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { SxProps } from "@mui/material";
import { UserInterface } from "@/interfaces/User";
import FileSlide from "../../../FileSlide";
import useNewPostFormModal, { NewPostFormModalProps } from "./useNewPostFormModal";
import { twMerge } from "tailwind-merge";
import { getCurrentUser } from "@/lib/actions";
import Loading from "@/components/Loading";

const avatarSxProps: SxProps = {
    height: 50,
    width: 50,
}

function AvatarContainer() {
    const currentUser = React.use<UserInterface.SimpleType>(getCurrentUser())

    return (
        <div className="flex gap-2 items-center">
            <Avatar
                image={currentUser.profileImageUrl || currentUser.name}
                avatarSxProps={avatarSxProps}
            />
            <p className="text-lg text-gray-500" >{currentUser.name}</p>
        </div>
    )
}

export default function NewPostFormModal(props: NewPostFormModalProps) {
    const hook = useNewPostFormModal(props)

    return (
        <ModalContainer
            modalClassName="max-w-[900px] h-fit max-h-full overflow-auto"
            onClose={props.onClose}

        >
            <div className="p-4 flex flex-col items-center gap-3 h-full w-full">
                <h1 className="w-fit text-2xl text-gray-500 font-semibold text-gradient tracking-wider ">
                    New Post
                </h1>
                <form className="w-full grow overflow-auto flex flex-col gap-3" action="" onSubmit={hook.handleSubmit}>

                    <div className="flex justify-between items-center">
                        <React.Suspense fallback={<Loading height={35} width={35} />}>
                            <AvatarContainer />
                        </React.Suspense>
                        <SymetricHorizontalButtonList btnData={hook.btnData} renderDelay={200} buttonClassName="px-6" />
                    </div>

                    <div className={twMerge(hook.files.length === 0 ? "min-h-[300px]" : "")}>
                        <textarea
                            autoFocus
                            ref={hook.textareRef}
                            rows={1}
                            className="p-3 w-full text-gray-500 outline-none resize-none overflow-hidden min-h-[36px] max-h-full"
                            placeholder="What are you thinking about?"
                            value={hook.content}
                            onChange={hook.handleChange}
                            onKeyDown={hook.handleKeyDown}
                        />
                    </div>


                    <div className="grid">

                        {hook.files.length === 0 ? (
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
                                    onChange={hook.handleFileInputChange}
                                    multiple
                                />
                            </>
                        )
                            : (<FileSlide files={hook.files} />)
                        }

                        <div className="w-full h-[2px] bg-gray-500 my-4" />

                        <div className="text-right">
                            <button type="submit" className="py-3 px-10 bg-gradient text-white font-semibold rounded-full">
                                Create Post
                            </button>
                        </div>
                    </div>



                </form>
            </div>

        </ModalContainer>
    )

}