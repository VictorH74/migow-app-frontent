/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React from "react"
import ModalContainer from "@/components/ModalContainer";
import { PeoplesModalStatus } from "@/types";
import useClientHTTP from "@/hooks/useClientHTTP";
import { UserInterface } from "@/interfaces/User";
import { ResponsePageInterface } from "@/interfaces/ResponsePage";
import Tabs from "@/components/Tabs";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { serverFetch } from "@/lib/actions";

interface PeoplesModalProps {
    onClose(): void
    peoplesModalStatus: PeoplesModalStatus
    currentUser: UserInterface.SimpleType
}

export interface TabPanelProps {
    children(user: UserInterface.RetrievedType): React.ReactNode;
    index: number;
    value: number;
}

// TODO: implements infinity scroll
export default function PeoplesModal(props: PeoplesModalProps) {
    const clientHTTP = useClientHTTP()

    const findPeoples = React.useCallback(async (inputValue: string) => {
        return clientHTTP.getAllUserByUsernamePrefix("{tokenUserId}", inputValue, {pageSize: 15});
    }, [])

    const findFriends = React.useCallback(async (inputValue: string) => {
        const simpleUsersPage: ResponsePageInterface<UserInterface.SimpleType> = await clientHTTP.getAllFriendByUsernamePrefix("{tokenUserId}", inputValue, {pageSize: 15})
        simpleUsersPage.content = simpleUsersPage.content.map(u => ({ ...u, isFriend: true }));
        return simpleUsersPage as ResponsePageInterface<UserInterface.RetrievedType>

    }, [])

    const switchFriendshipStatus = React.useCallback((user: UserInterface.RetrievedType, queryTag: string, callBack: () => void) => async () => {
        const requestObj: { userId: string, friendId: string } = {
            userId: props.currentUser.id,
            friendId: user.id
        }

        const createRequestInit: (method: string) => RequestInit = (method) => ({
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestObj),
        })

        await serverFetch("/u-s/friendships", createRequestInit(user.isFriend ? "DELETE" : "POST"), queryTag)

        callBack();
    }, [])

    return (
        <ModalContainer
            onClose={props.onClose}
        >

            <Tabs<UserInterface.RetrievedType>
                initialTabIndex={props.peoplesModalStatus === "inPeoples" ? 0 : 1}
                generateChildren={
                    (user, currentTab, setUsers) => <UserTile
                        key={user.id}
                        {...user}
                        onFriendshipStatusBtnClick={
                            switchFriendshipStatus(
                                user,
                                currentTab === 0 ? "people-list" : "friend-list",
                                currentTab === 0
                                    ? () => setUsers(prev =>
                                        prev.map(u => ({ ...u, isFriend: u.id === user.id ? !u.isFriend : u.isFriend })))
                                    : () => setUsers(prev =>
                                        prev.filter(u => u.id !== user.id))
                            )
                        }
                    />
                }
                tabGenerateArray={[
                    {
                        label: "Peoples",
                        queryFunc: findPeoples
                    },
                    {
                        label: "Friends",
                        queryFunc: findFriends
                    },
                ]}
            />
        </ModalContainer>
    )

}

interface UserTileProps extends UserInterface.RetrievedType {
    onFriendshipStatusBtnClick: () => Promise<void>
}

function UserTile(props: UserTileProps) {
    return (
        <li className="flex justify-between px-1 py-2">
            <div className="flex items-center hover:cursor-pointer group">
                <Avatar image={props.profileImageUrl || props.name} />
                <Link href={"/in/profile/" + props.username} className="group-hover:underline font-semibold text-gray-600">{props.username}</Link>
            </div>

            <button
                className={twMerge("py-2 px-4 font-semibold rounded-full", props.isFriend ? "bg-gray-200 text-gray-500" : "bg-gradient text-white")}
                onClick={() => props.onFriendshipStatusBtnClick()}
            >
                {props.isFriend ? "Unfollow" : "Follow"}
            </button>
        </li>
    )
}