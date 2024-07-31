"use client"
import { ReactionInterface } from "@/interfaces/Reaction"
import ModalContainer from "../ModalContainer"
import React from "react";
import useClientHTTP from "@/hooks/useClientHTTP";
import { ReactionTypeEnum } from "@/enums";
import { UserInterface } from "@/interfaces/User";
import Tabs from "../Tabs";
import Avatar from "../Avatar";
import Link from "next/link";

interface ReactionUserListModalProps {
    onClose(): void
    reactionTypeCounts: ReactionInterface.ReactionTypeCountsType
    target: ReactionInterface.TargetType
}


export default function ReactionUserListModal(props: ReactionUserListModalProps) {
    const clientHTTP = useClientHTTP()

    const tabArray = React.useMemo(() => {
        const array: { prop: string, value: number }[] = []

        Object.entries(props.reactionTypeCounts).forEach(([k, v]) => {
            if (v > 0) array.push({ prop: k, value: v })
        })

        return array
    }, [props.reactionTypeCounts])

    const reaction: Record<keyof ReactionInterface.ReactionTypeCountsType, { name: string, type: ReactionTypeEnum }> = React.useMemo(() => ({
        cuteReaction: { name: "Cute", type: ReactionTypeEnum.CUTE },
        funnyReaction: { name: "Funny", type: ReactionTypeEnum.FUNNY },
        likeReaction: { name: "Like", type: ReactionTypeEnum.LIKE },
        loveReaction: { name: "Love", type: ReactionTypeEnum.LOVE },
        sadReaction: { name: "Sad", type: ReactionTypeEnum.SAD },
        scaryReaction: { name: "Scary", type: ReactionTypeEnum.SCARY },
    }), [])

    return (
        <ModalContainer
            onClose={props.onClose}
        >
            <Tabs<UserInterface.SimpleType>
                generateChildren={(user) => <UserTile key={user.id} {...user} reactionIcon="💙" />}
                tabGenerateArray={[
                    {
                        label: "All",
                        queryFunc: (usernamePrefix) => clientHTTP.getAllReactionUser(props.target, usernamePrefix)
                    },
                    ...(tabArray.length > 1 ? tabArray.map(obj => ({
                        label: reaction[obj.prop as keyof ReactionInterface.ReactionTypeCountsType].name,
                        queryFunc: (usernamePrefix: string) => clientHTTP
                            .getAllReactionUser(
                                props.target,
                                usernamePrefix,
                                reaction[obj.prop as keyof ReactionInterface.ReactionTypeCountsType].type,
                            )
                    })) : []),
                ]}
            />
        </ModalContainer>
    )
}

interface UserTileProps extends UserInterface.SimpleType {
    reactionIcon: string
}

function UserTile(props: UserTileProps) {
    return (
        <li className="flex justify-between px-1 py-2">
            <div className="flex items-center hover:cursor-pointer group">
                <div className="relative">
                    <Avatar image={props.profileImageUrl || props.name} />
                    <span className="absolute bg-white shadow-md rounded-full -bottom-1 right-0 text-2xls">{props.reactionIcon}</span>
                </div>
                <Link href={"/in/profile/" + props.username} className="group-hover:underline font-semibold text-gray-600">{props.username}</Link>
            </div>
        </li>
    )
}