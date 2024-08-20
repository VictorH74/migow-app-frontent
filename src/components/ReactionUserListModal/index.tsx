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
import { EMOJI_BY_REACTION_TYPE, REACTION_ARRAY } from "@/util/constants";

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

    const reactionByPropName: Record<keyof ReactionInterface.ReactionTypeCountsType, { name: string, type: ReactionTypeEnum }> = React.useMemo(() => {
        const ReactionByName: Record<any, any> = {}
        REACTION_ARRAY.forEach(r => {
            ReactionByName[r.name.toLowerCase() + "Reaction"] = r
        })
        console.log(ReactionByName)
        return ReactionByName
    }, [])

    return (
        <ModalContainer
            onClose={props.onClose}
        >
            <Tabs<UserInterface.ReactionUserType>
                generateChildren={(user) => <UserTile key={user.id} {...user} reactionIcon={EMOJI_BY_REACTION_TYPE[user.reactionType]} />}
                tabGenerateArray={[
                    {
                        label: "All",
                        queryFunc: (usernamePrefix) => clientHTTP.getAllReactionUser(props.target, usernamePrefix)
                    },
                    ...(tabArray.length > 1 ? tabArray.map(obj => ({
                        label: reactionByPropName[obj.prop as keyof ReactionInterface.ReactionTypeCountsType].name,
                        queryFunc: (usernamePrefix: string) => clientHTTP
                            .getAllReactionUser(
                                props.target,
                                usernamePrefix,
                                reactionByPropName[obj.prop as keyof ReactionInterface.ReactionTypeCountsType].type,
                            )
                    })) : []),
                ]}
            />
        </ModalContainer>
    )
}

interface UserTileProps extends UserInterface.ReactionUserType {
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