import useNewPost from '@/hooks/useNewPost';
import React from 'react';

export default function useNewPostFormModal() {
    const publicBtnRef = React.useRef<HTMLButtonElement | null>(null);
    const justFriendsBtnRef = React.useRef<HTMLButtonElement | null>(null);
    const textareRef = React.useRef<HTMLTextAreaElement>(null);

    const [postVisibility, setPostVisibility] = React.useState<0 | 1>(0);
    const [files, setFiles] = React.useState<File[]>([]);
    const [content, setContent] = React.useState('');

    const { createPost, sharedPost, showAddPostModal, closeAddPostModal } =
        useNewPost();

    const btnData = React.useMemo(
        () => [
            {
                ref: publicBtnRef,
                label: 'Public',
                selected: postVisibility === 0,
                onClick: () => setPostVisibility(0),
            },
            {
                ref: justFriendsBtnRef,
                label: 'Just Friends',
                selected: postVisibility === 1,
                onClick: () => setPostVisibility(1),
            },
        ],
        [postVisibility]
    );

    React.useEffect(() => {
        if (textareRef.current && !content) {
            textareRef.current.style.height = 'auto';
        }
    }, [content]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setContent((prevText) => {
                return prevText + '\n';
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
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetFiles = e.target.files;

        if (!targetFiles) return;

        let filesArray = Array.from(targetFiles).slice(0, 5);
        let videoCount = 0;

        for (let i = 0; i < filesArray.length; i++) {
            if (filesArray[i].type == 'video/mp4') videoCount++;
            if (videoCount > 1) {
                alert('Só é possivel haver 1 vídeo por post');
                filesArray = filesArray.filter(
                    (f, j) => i == j || f.type != 'video/mp4'
                );
                break;
            }
        }

        setFiles(filesArray);
    };

    // TODO disable form interaction when submitted
    const handleSubmit = async (event?: React.FormEvent) => {
        event?.preventDefault();

        if (!content) return;

        const formattedContent = content.split('\n').join('<br>');

        await createPost(formattedContent, postVisibility, files);
    };

    return {
        handleSubmit,
        btnData,
        textareRef,
        content,
        handleChange,
        handleKeyDown,
        sharedPost,
        files,
        handleFileInputChange,
        handleChangeT,
        showAddPostModal,
        closeAddPostModal,
    };
}
