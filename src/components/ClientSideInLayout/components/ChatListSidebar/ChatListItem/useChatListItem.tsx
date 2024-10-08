/* eslint-disable react-hooks/exhaustive-deps */
import { ChatMetadataInterface } from '@/interfaces/Chat';
import { UserInterface } from '@/interfaces/User';
import { serverFetch } from '@/lib/actions';
import { usersMock } from '@/mockData';
import React from 'react';

export interface ChatListItemProps extends ChatMetadataInterface {
    onClick(user: UserInterface.SimpleType): void;
    currentUserId: UserInterface['id'];
}

export default function useChatListItem(props: ChatListItemProps) {
    const [chatUser, setChatUser] = React.useState<UserInterface.SimpleType>();
    const [loadingUser, setLoadingUser] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            const id = props.users.filter(
                (id) => id !== props.currentUserId
            )[0];
            // const userData = usersMock.find((user) => user.id === id);
            const userData = await serverFetch<UserInterface.SimpleType>(
                `/u-s/users/${id}`
            );

            if (!userData) {
                // TODO: handler not found user error
                console.error('User not found: ', id);
                return;
            }

            setChatUser(userData);
        })();
    }, []);

    return { chatUser, loadingUser };
}
