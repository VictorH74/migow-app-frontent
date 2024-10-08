import { ChatMetadataInterface } from '@/interfaces/Chat';
import { getCurrentUser } from '@/lib/actions';
import { db } from '@/lib/firebase';
import { chatsMock } from '@/mockData';
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    Unsubscribe,
    where,
} from 'firebase/firestore';
import React from 'react';

interface ChatListCtxProps {
    chatList: ChatMetadataInterface[];
    loadingChatList: boolean;
}

export const ChatListCtx = React.createContext<ChatListCtxProps | null>(null);

export default function ChatListProvider({
    children,
}: React.PropsWithChildren) {
    const [chatList, setChatList] = React.useState<ChatMetadataInterface[]>([]);
    const [loadingChatList, setLoadingChatList] = React.useState(true);

    React.useEffect(() => {
        let unsubscribe: Unsubscribe | undefined;

        (async () => {
            console.log('Getting chat metadata list...');
            const user = await getCurrentUser();
            console.log(user?.id);
            if (!user) {
                alert('Error try loading chat metadata list');
                console.error('undefined user');
                return;
            }
            const q = query(
                collection(db, 'chat-metadata'),
                where('users', 'array-contains', user.id),
                orderBy('createdAt', 'desc')
            );
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const chatDatas: any[] = [];
                querySnapshot.forEach((doc) => {
                    let chat = { ...doc.data() };
                    if (chat.recentMessage)
                        chat['recentMessage'] = {
                            ...chat.recentMessage,
                            sentAt: chat.recentMessage.sentAt.toString(),
                        };
                    chatDatas.push({
                        id: doc.id,
                        ...chat,
                        createdAt: chat.createdAt.toString(),
                    });
                });
                console.log(chatDatas);
                setChatList(chatDatas);
                setLoadingChatList(false);
            });
        })();

        return () => {
            if (unsubscribe) unsubscribe();
        };

        // mock
        // setChatList(chatsMock);
        // setLoadingChatList(false);
    }, []);
    return (
        <ChatListCtx.Provider value={{ chatList, loadingChatList }}>
            {children}
        </ChatListCtx.Provider>
    );
}
