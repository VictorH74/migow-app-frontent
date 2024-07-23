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
    postId: string
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
                generateChildren={(user) => <UserTile key={user.id} {...user} />}
                tabGenerateArray={[
                    {
                        label: "All",
                        queryFunc: (usernamePrefix) => clientHTTP.getAllReactionUser(`post_${props.postId}`, usernamePrefix)
                    },
                    ...(tabArray.length > 1 ? tabArray.map(obj => ({
                        label: reaction[obj.prop as keyof ReactionInterface.ReactionTypeCountsType].name,
                        queryFunc: (usernamePrefix: string) => clientHTTP
                            .getAllReactionUser(
                                `post_${props.postId}`,
                                usernamePrefix,
                                reaction[obj.prop as keyof ReactionInterface.ReactionTypeCountsType].type,
                            )
                    })) : []),
                ]}
            />
        </ModalContainer>
    )
}

function UserTile(props: UserInterface.SimpleType) {
    return (
        <li className="flex justify-between px-1 py-2">
            <div className="flex items-center hover:cursor-pointer group">
                <Avatar image={props.profileImageUrl || props.name} />
                <Link href={"/in/profile/" + props.username} className="group-hover:underline font-semibold text-gray-600">{props.username}</Link>
            </div>
        </li>
    )
}