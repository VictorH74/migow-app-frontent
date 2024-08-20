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
import { useRouter } from "next/navigation";
import { FriendshipStatusEnum } from "@/enums";

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

const isFriend = (status: FriendshipStatusEnum) => status === FriendshipStatusEnum.IS_FRIEND

// TODO: implements infinity scroll
export default function PeoplesModal(props: PeoplesModalProps) {
    const clientHTTP = useClientHTTP()

    const findPeoples = React.useCallback(async (inputValue: string) => {
        const data = await clientHTTP.getAllUserByUsernamePrefix("{tokenUserId}", inputValue, { pageSize: 15 });
        console.log(data)
        return data;
    }, [])

    const findFriends = React.useCallback(async (inputValue: string) => {
        const simpleUsersPage: ResponsePageInterface<UserInterface.SimpleType> = await clientHTTP.getAllFriendByUsernamePrefix("{tokenUserId}", inputValue, { pageSize: 15 })
        simpleUsersPage.content = simpleUsersPage.content.map(u => ({ ...u, friendshipStatus: FriendshipStatusEnum.IS_FRIEND }));
        const data = await simpleUsersPage as ResponsePageInterface<UserInterface.RetrievedType>
        console.log(data)
        return data;

    }, [])

    const switchFriendshipStatus = React.useCallback((user: UserInterface.RetrievedType, queryTag: string, callBack: (finalStatus: FriendshipStatusEnum) => void) => async () => {
        const isDeleteMethod = isFriend(user.friendshipStatus)

        const requestObj: Record<string, string> = {
            ownerId: props.currentUser.id,
            targetId: user.id
        }

        const createRequestInit: (method: string) => RequestInit = (method) => ({
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestObj),
        })


        try {
            console.log(`/u-s/friendships${isDeleteMethod ? "" : "/request"}`, createRequestInit(isDeleteMethod ? "DELETE" : "POST"), queryTag)
            await serverFetch(`/u-s/friendships${isDeleteMethod ? "" : "/request"}`, createRequestInit(isDeleteMethod ? "DELETE" : "POST"), queryTag)

            callBack(isDeleteMethod ? FriendshipStatusEnum.IS_NOT_FRIEND : FriendshipStatusEnum.PENDING);
        } catch (e) {
            alert("error")
            console.error(e)
        }


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
                                    ? (finalStatus) => setUsers(prev =>
                                        prev.map(u => ({ ...u, friendshipStatus: u.id === user.id ? finalStatus : u.friendshipStatus })))
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

const buttonLabelByStatus: Record<FriendshipStatusEnum, string> = {
    "1": "Unfollow",
    "2": "Follow",
    "3": "Pending",
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
                className={twMerge(
                    "py-2 px-4 font-semibold rounded-full",
                    props.friendshipStatus == FriendshipStatusEnum.IS_FRIEND
                        ? "bg-gray-400 text-gray-100"
                        : props.friendshipStatus == FriendshipStatusEnum.PENDING
                            ? "bg-gray-200 text-gray-500"
                            : "bg-gradient text-white")}
                onClick={() => props.onFriendshipStatusBtnClick()}
                disabled={props.friendshipStatus == FriendshipStatusEnum.PENDING}
            >
                {buttonLabelByStatus[props.friendshipStatus]}
            </button>
        </li>
    )
}