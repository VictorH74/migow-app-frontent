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

interface PeoplesModalProps {
    onClose(): void
    peoplesModalStatus: PeoplesModalStatus
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
        return clientHTTP.getAllUserByUsernamePrefix("{tokenUserId}", inputValue);
    }, [])

    const findFriends = React.useCallback(async (inputValue: string) => {
        const simpleUsersPage: ResponsePageInterface<UserInterface.SimpleType> = await clientHTTP.getAllFriendByUsernamePrefix("{tokenUserId}", inputValue)
        simpleUsersPage.content = simpleUsersPage.content.map(u => ({ ...u, isFriend: true }));
        return simpleUsersPage as ResponsePageInterface<UserInterface.RetrievedType>

    }, [])

    return (
        <ModalContainer
            onClose={props.onClose}
        >

            <Tabs<UserInterface.RetrievedType>
                initialTabIndex={props.peoplesModalStatus === "inPeoples" ? 0 : 1}
                generateChildren={(user) => <UserTile key={user.id} {...user} />}
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

interface UserTileProps extends UserInterface.RetrievedType { }

function UserTile(props: UserTileProps) {
    return (
        <li className="flex justify-between px-1 py-2">
            <div className="flex items-center hover:cursor-pointer group">
                <Avatar image={props.profileImageUrl || props.name} />
                <Link href={"/in/profile/" + props.username} className="group-hover:underline font-semibold text-gray-600">{props.username}</Link>
            </div>

            <button className={twMerge("py-2 px-4 font-semibold rounded-full", props.isFriend ? "bg-gray-200 text-gray-500" : "bg-gradient text-white")}>{props.isFriend ? "Unfollow" : "Follow"}</button>
        </li>
    )
}