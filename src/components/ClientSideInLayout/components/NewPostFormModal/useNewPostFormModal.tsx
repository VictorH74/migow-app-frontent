import useClientHTTP from "@/hooks/useClientHTTP";
import usePostArray from "@/hooks/usePostArray";
import { MediaInterface } from "@/interfaces/Media";
import { PostInterface } from "@/interfaces/Post";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";

export interface NewPostFormModalProps {
    onClose(): void
}


export default function useNewPostFormModal(props: NewPostFormModalProps) {
    const publicBtnRef = React.useRef<HTMLButtonElement | null>(null)
    const justFriendsBtnRef = React.useRef<HTMLButtonElement | null>(null)
    const textareRef = React.useRef<HTMLTextAreaElement>(null);

    const [postVisibility, setPostVisibility] = React.useState<0 | 1>(0)
    const [files, setFiles] = React.useState<File[]>([])
    const [content, setContent] = React.useState("");

    const clientHTTP = useClientHTTP()

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

    const { setPosts } = usePostArray()

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

    const handleChangeT = (value: string) => {

        setContent(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;

        setContent(value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetFiles = e.target.files;

        if (!targetFiles) return

        let filesArray = Array.from(targetFiles).slice(0, 5)
        let videoCount = 0

        for (let i = 0; i < filesArray.length; i++) {
            if (filesArray[i].type == "video/mp4") videoCount++
            if (videoCount > 1) {
                alert("Só é possivel haver 1 vídeo por post")
                filesArray = filesArray.filter((f, j) => (i == j || f.type != "video/mp4"))
                break;
            }
        }

        setFiles(filesArray)
    }

    const uploadFiles = async () => {
        // TODO: save images in firebase storage
        const promises: Promise<void>[] = []
        const uploadedMedias: MediaInterface[] = []

        files.forEach(async (file, i) => {
            promises.push(new Promise(async (resolve, reject) => {
                const finalFileName = crypto.randomUUID() + "||" + file.name.split(".").slice(0, -1).join(".")
                const storageRef = ref(storage, `post-media/${finalFileName}`);
                try {
                    // const fileBuffer = await file.arrayBuffer()
                    // try with 'fileBuffer' if uploadBytes fail
                    const snap = await uploadBytes(storageRef, file, { contentType: file.type })
                    const url = await getDownloadURL(snap.ref)
                    console.log(url)
                    uploadedMedias.push({ url, name: snap.metadata.name, type: file.type })
                    resolve()
                } catch (e) {
                    reject(e)
                }
            }))
        })
        await Promise.all(promises)

        return uploadedMedias;
    }


    // disable form interaction when submitted
    const handleSubmit = async (event?: React.FormEvent) => {
        event?.preventDefault();

        if (!content) return;
        
        const formattedContent = content.split("\n").join("<br>")
        
        let uploadedMedias: MediaInterface[] | null = null
        
        if (files.length > 0)
            uploadedMedias = await uploadFiles();
        
        // TODO: include 'postVisibility' prop
        const post: PostInterface.CreateType = {
            text: formattedContent,
            mediaList: uploadedMedias,
            sharedPost: null
        }
        const createdPost = await clientHTTP.createPost(post)
        
        setPosts(prev => [createdPost, ...prev])

        setContent(() => "");

        props.onClose()
    }

    return {
        handleSubmit,
        btnData,
        textareRef,
        content,
        handleChange,
        handleKeyDown,
        files,
        handleFileInputChange,
        handleChangeT
    }
}