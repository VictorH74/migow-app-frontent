/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import ModalContainer from '@/components/ModalContainer';
import { PeoplesModalStatus } from '@/types';
import { UserInterface } from '@/interfaces/User';
import { ResponsePageInterface } from '@/interfaces/ResponsePage';
import Tabs from '@/components/Tabs';
import Avatar from '@/components/Avatar';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { serverFetch } from '@/lib/actions';
import { FriendshipStatusEnum } from '@/enums';
import { parsePaginationToParams } from '@/util/functions';

interface PeoplesModalProps {
    onClose(): void;
    peoplesModalStatus: PeoplesModalStatus;
    currentUser: UserInterface.SimpleType;
}

export interface TabPanelProps {
    children(user: UserInterface.RetrievedType): React.ReactNode;
    index: number;
    value: number;
}

const isFriend = (status: FriendshipStatusEnum) =>
    status === FriendshipStatusEnum.IS_FRIEND;

const queryTagByTab: Record<number, string> = {
    0: 'people-list',
    1: 'friend-list',
};

type CallbackGeneratorType = (
    setUsers: (
        value: React.SetStateAction<UserInterface.RetrievedType[]>
    ) => void,
    user: UserInterface.RetrievedType
) => (finalStatus: FriendshipStatusEnum) => void;

const queryFuncCallbackByTab: Record<number, CallbackGeneratorType> = {
    0:
        (
            setUsers: (
                value: React.SetStateAction<UserInterface.RetrievedType[]>
            ) => void,
            user: UserInterface.RetrievedType
        ) =>
        (finalStatus: FriendshipStatusEnum) =>
            setUsers((prev) =>
                prev.map((u) => ({
                    ...u,
                    friendshipStatus:
                        u.id === user.id ? finalStatus : u.friendshipStatus,
                }))
            ),
    1:
        (
            setUsers: (
                value: React.SetStateAction<UserInterface.RetrievedType[]>
            ) => void,
            user: UserInterface.RetrievedType
        ) =>
        () =>
            setUsers((prev) => prev.filter((u) => u.id !== user.id)),
};

// TODO: implements infinity scroll
export default function PeoplesModal(props: PeoplesModalProps) {
    const getPeoples = React.useCallback(async (inputValue: string) => {
        const usersPage = await serverFetch<
            ResponsePageInterface<UserInterface.RetrievedType>
        >(
            `/u-s/users/by/{tokenUserId}?usernamePrefix=${inputValue}&${parsePaginationToParams(
                { pageSize: 15 }
            )}`,
            {
                cache: 'no-store',
                next: { tags: ['people-list'] },
            }
        );

        if (!usersPage) throw new Error('Erro try loading page of users');

        return usersPage;
    }, []);

    const getFriends = React.useCallback(async (inputValue: string) => {
        const simpleUsersPage = await serverFetch<
            ResponsePageInterface<UserInterface.RetrievedType>
        >(
            `/u-s/users/{tokenUserId}/friendships?usernamePrefix=${inputValue}&${parsePaginationToParams(
                { pageSize: 15 }
            )}`,
            {
                cache: 'no-store',
                next: { tags: ['friend-list'] },
            }
        );

        if (!simpleUsersPage) throw new Error('Erro try loading page of users');

        simpleUsersPage.content = simpleUsersPage.content.map((u) => ({
            ...u,
            friendshipStatus: FriendshipStatusEnum.IS_FRIEND,
        }));
        return simpleUsersPage as ResponsePageInterface<UserInterface.RetrievedType>;
    }, []);

    const getUsersFromSentRequests = React.useCallback(async () => {
        const usersPage = await serverFetch<
            ResponsePageInterface<{ user: UserInterface.SimpleType }>
        >(
            `/u-s/friendships/sent-requests?userId={tokenUserId}&${parsePaginationToParams(
                { pageSize: 15 }
            )}`,
            {
                cache: 'no-store',
            }
        );

        if (!usersPage) throw new Error('Erro try loading page of users');

        return usersPage;
    }, []);

    const removeSentRequest = React.useCallback(
        async (
            targetId: string,
            setUsers: React.Dispatch<
                React.SetStateAction<UserInterface.SimpleType[]>
            >
        ) => {
            await serverFetch<void>(`/u-s/friendships/sent-requests`, {
                method: 'DELETE',
                body: JSON.stringify({
                    ownerId: '{tokenUserId}',
                    targetId,
                }),
            });
            setUsers((prev) => prev.filter((u) => u.id != targetId));
        },
        []
    );

    const switchFriendshipStatus = React.useCallback(
        (
                user: UserInterface.RetrievedType,
                queryTag: string,
                callBack: (finalStatus: FriendshipStatusEnum) => void
            ) =>
            async () => {
                const isDeleteMethod = isFriend(user.friendshipStatus);

                const requestObj: Record<string, string> = {
                    ownerId: props.currentUser.id,
                    targetId: user.id,
                };

                const createRequestInit: (method: string) => RequestInit = (
                    method
                ) => ({
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestObj),
                });

                try {
                    await serverFetch(
                        `/u-s/friendships${isDeleteMethod ? '' : '/request'}`,
                        createRequestInit(isDeleteMethod ? 'DELETE' : 'POST'),
                        queryTag
                    );

                    callBack(
                        isDeleteMethod
                            ? FriendshipStatusEnum.IS_NOT_FRIEND
                            : FriendshipStatusEnum.PENDING
                    );
                } catch (e) {
                    alert('error');
                    console.error(e);
                }
            },
        []
    );

    const generatePeoplesFriendsTabChildren: (
        user: UserInterface.RetrievedType,
        currentTabIndex: number,
        setUsers: React.Dispatch<
            React.SetStateAction<UserInterface.RetrievedType[]>
        >
    ) => React.ReactElement = React.useCallback(
        (user, currentTab, setUsers) => (
            <UserTile key={user.id} {...user}>
                <button
                    className={twMerge(
                        'py-2 px-4 font-semibold rounded-full',
                        user.friendshipStatus == FriendshipStatusEnum.IS_FRIEND
                            ? 'bg-gray-400 text-gray-100'
                            : user.friendshipStatus ==
                              FriendshipStatusEnum.PENDING
                            ? 'bg-gray-200 text-gray-500'
                            : 'bg-gradient text-white'
                    )}
                    onClick={switchFriendshipStatus(
                        user,
                        queryTagByTab[currentTab],
                        queryFuncCallbackByTab[currentTab](setUsers, user)
                    )}
                    disabled={
                        user.friendshipStatus == FriendshipStatusEnum.PENDING
                    }
                >
                    {buttonLabelByStatus[user.friendshipStatus]}
                </button>
            </UserTile>
        ),
        []
    );

    return (
        <ModalContainer onClose={props.onClose}>
            <Tabs
                initialTabIndex={
                    props.peoplesModalStatus === 'inPeoples' ? 0 : 1
                }
                tabGenerateArray={[
                    {
                        label: 'Peoples',
                        queryFunc: getPeoples,
                        children: generatePeoplesFriendsTabChildren,
                    },
                    {
                        label: 'Friends',
                        queryFunc: getFriends,
                        children: generatePeoplesFriendsTabChildren,
                    },
                    {
                        label: 'Sent Requests',
                        queryFunc: getUsersFromSentRequests,
                        children: (user, _, setUsers) => (
                            <UserTile key={user.id} {...user}>
                                <button
                                    className="py-2 px-4 font-semibold rounded-full bg-gray-400 text-gray-100"
                                    onClick={() =>
                                        removeSentRequest(user.id, setUsers)
                                    }
                                >
                                    Cancel
                                </button>
                            </UserTile>
                        ),
                    },
                ]}
            />
        </ModalContainer>
    );
}

const buttonLabelByStatus: Record<FriendshipStatusEnum, string> = {
    '1': 'Unfollow',
    '2': 'Follow',
    '3': 'Pending',
};

interface UserTileProps extends UserInterface.RetrievedType {
    children: React.ReactNode;
}

function UserTile(props: UserTileProps) {
    return (
        <li className="flex justify-between px-1 py-2">
            <div className="flex items-center hover:cursor-pointer group">
                <Avatar image={props.profileImageUrl || props.name} />
                <Link
                    href={'/in/profile/' + props.username}
                    className="group-hover:underline font-semibold text-gray-600"
                >
                    {props.username}
                </Link>
            </div>

            {props.children}
        </li>
    );
}
