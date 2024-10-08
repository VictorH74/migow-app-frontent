import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ChatMetadataInterface } from '@/interfaces/Chat';
import {
    collection,
    orderBy,
    query,
    onSnapshot,
    Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MessageInterface } from '@/interfaces/Message';
import { UserInterface } from '@/interfaces/User';

interface MessageListProps {
    currentUserId: UserInterface['id'];
    chatMetadataId: ChatMetadataInterface['id'];
}

export const MessageList: React.FC<MessageListProps> = (props) => {
    const [messageList, setMessageList] = React.useState<MessageInterface[]>(
        []
    );

    React.useEffect(() => {
        // TODO: fetch chat by chatBox.chat.id from firebase
        let unsubscribe: Unsubscribe | undefined;
        (async () => {
            try {
                console.log('load messages by ', props.chatMetadataId);
                // TODO load messages
                const q = query(
                    collection(db, `/chat/${props.chatMetadataId}/message`),
                    orderBy('sentAt', 'asc')
                );

                unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const msgList: MessageInterface[] = [];
                    querySnapshot.forEach((doc) => {
                        msgList.push({
                            id: doc.id,
                            ...doc.data(),
                        } as MessageInterface);
                    });
                    console.log(msgList);
                    setMessageList(msgList);
                });

                // temp
                // ??
                // const retrievedChat: ChatMetadataInterface = {
                //     id: 'vvv-bbb',
                //     createdAt: '',
                //     users: ['vvv', 'bbb'],
                // };
                // setChat(retrievedChat);
                // setCurrentUserId('vvv');
                // const messages: MessageInterface[] = [
                //     {
                //         id: 'asdasdasdasd',
                //         sender: 'vvv',
                //         sentAt: new Date().toISOString(),
                //         content: 'Hello!',
                //         replyMsg: null,
                //     },
                //     {
                //         id: 'dfgdfgdfgdfg',
                //         sender: 'bbb',
                //         sentAt: new Date().toISOString(),
                //         content: 'Hi!',
                //         replyMsg: null,
                //     },
                // ];
                // setMessageList(messages);
            } catch (e) {
                // setError('Error');
            }
        })();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    return messageList.map((msg) => (
        <li
            key={msg.id}
            className={twMerge(
                'my-2 grid w-full',
                msg.sender == props.currentUserId && 'justify-end'
            )}
        >
            <p
                className={twMerge(
                    'p-2 text-white bg-gray-700 rounded-md size-fit',
                    msg.sender == props.currentUserId && 'bg-blue-400'
                )}
            >
                {msg.content}
            </p>
        </li>
    ));
};
