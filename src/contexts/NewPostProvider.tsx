'use client';
import React from 'react';
import useClientHTTP from '@/hooks/useClientHTTP';
import usePostArray from '@/hooks/usePostArray';
import { MediaInterface } from '@/interfaces/Media';
import { PostInterface } from '@/interfaces/Post';
import { storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { serverFetch } from '@/lib/actions';

interface NewPostCtxProps {
    createPost: (
        text: string,
        visibility: number,
        files: File[]
    ) => Promise<void>;
    sharedPost: PostInterface | null;
    setSharedPost: React.Dispatch<React.SetStateAction<PostInterface | null>>;
    showAddPostModal: boolean;
    setShowAddPostModal: React.Dispatch<React.SetStateAction<boolean>>;
    closeAddPostModal: () => void;
}

export const NewPostCtx = React.createContext<NewPostCtxProps | null>(null);

export function NewPostProvider({ children }: React.PropsWithChildren) {
    const [sharedPost, setSharedPost] = React.useState<PostInterface | null>(
        null
    );
    const [showAddPostModal, setShowAddPostModal] = React.useState(false);

    const clientHTTP = useClientHTTP();

    const { setPosts } = usePostArray();

    const uploadFiles = async (files: File[]) => {
        // TODO: save images in firebase storage
        const promises: Promise<void>[] = [];
        const uploadedMedias: MediaInterface[] = [];

        files.forEach(async (file, i) => {
            promises.push(
                new Promise(async (resolve, reject) => {
                    const finalFileName =
                        crypto.randomUUID() +
                        '||' +
                        file.name.split('.').slice(0, -1).join('.');
                    const storageRef = ref(
                        storage,
                        `post-media/${finalFileName}`
                    );
                    try {
                        // const fileBuffer = await file.arrayBuffer()
                        // try with 'fileBuffer' if uploadBytes fail
                        const snap = await uploadBytes(storageRef, file, {
                            contentType: file.type,
                        });
                        const url = await getDownloadURL(snap.ref);
                        console.log(url);
                        uploadedMedias.push({
                            url,
                            name: snap.metadata.name,
                            type: file.type,
                        });
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                })
            );
        });
        await Promise.all(promises);

        return uploadedMedias;
    };

    // disable form interaction when submitted
    const createPost = async (
        text: string,
        visibility: number,
        files: File[]
    ) => {
        if (!text) return;

        let uploadedMedias: MediaInterface[] | null = null;

        if (files.length > 0) uploadedMedias = await uploadFiles(files);

        // TODO: include 'postVisibility' prop
        const post: PostInterface.CreateType = {
            text,
            mediaList: uploadedMedias,
            sharedPost: sharedPost?.id || null,
            // visibility
        };

        const createdPost = await serverFetch<PostInterface>(`/p-s/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        });

        if (!!sharedPost) {
            createdPost!.sharedPost = sharedPost;
        }

        console.log('created post', createdPost);

        setPosts((prev) => [createdPost!, ...prev]);
        closeAddPostModal();
    };

    const closeAddPostModal = () => {
        if (sharedPost) setSharedPost(null);
        if (showAddPostModal) setShowAddPostModal(false);
    };

    return (
        <NewPostCtx.Provider
            value={{
                showAddPostModal,
                setShowAddPostModal,
                createPost,
                setSharedPost,
                closeAddPostModal,
                sharedPost,
            }}
        >
            {children}
        </NewPostCtx.Provider>
    );
}
