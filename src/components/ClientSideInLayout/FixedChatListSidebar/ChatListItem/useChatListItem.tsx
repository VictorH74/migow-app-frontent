/* eslint-disable react-hooks/exhaustive-deps */
import { ChatInterface } from "@/interfaces"
import { usersMock } from "@/mockData"
import { SimpleUserType } from "@/types"
import React from "react"

export interface ChatListItemProps extends ChatInterface {
    onClick(user: SimpleUserType): void
}

export default function useChatListItem(props: ChatListItemProps) {
    const [chatUser, setChatUser] = React.useState<SimpleUserType>()

    React.useEffect(() => {
        // TODO: fetch user by user.id in props.users
        // WITH CLIENTHTTP
        // const id = props.users.filter(id => id !== currentUser.id)[0]
        // const userData = clientHTTP.findUserById(id)
        // setChatUser(userData)

        const id = props.users.filter(id => id !== "vvv")[0]
        const userData = usersMock.find(user => user.id === id)

        if (!userData) {
            // TODO: handler not found user error
            alert("User not found")
            return;
        }


        setChatUser(userData)
    }, [])


    return { chatUser }
}