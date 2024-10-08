'use client';
import { useChatboxList } from '@/hooks/useChatboxList';
import { UserInterface } from '@/interfaces/User';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';

interface SendMessageBtnProps {
    user: UserInterface.SimpleType;
}

export const SendMessageBtn: React.FC<SendMessageBtnProps> = (props) => {
    const { includeChatBox } = useChatboxList();

    return (
        <button
            className="py-2 px-4 rounded-2xl bg-gray-500 text-white"
            onClick={() =>
                includeChatBox({
                    user: props.user,
                })
            }
        >
            <SendIcon /> Send Message
        </button>
    );
};
