import { OnlineUserInterface } from "@/interfaces"
import { onlineUsersMock } from "@/mockData"
import React from "react"

interface ResponseInterface {
    content: OnlineUserInterface[]
    onlineUsersCount: number
}

const response: ResponseInterface = {
    content: onlineUsersMock.slice(0, 6),
    onlineUsersCount: onlineUsersMock.length
}

export const OnlineFollowerBtnSize = 50;

export default function useOnlineUsersSidebar() {
    const [onlineUsers, setOnlineUsers] = React.useState<OnlineUserInterface[]>([])
    const [onlineUsersCount, setOnlineUsersCount] = React.useState(0)

    React.useEffect(() => {
        setOnlineUsers(response.content)
        setOnlineUsersCount(response.onlineUsersCount - response.content.length)
    }, [])

    // TODO: fetch online users on current user account limit preference

    return { onlineUsers, onlineUsersCount }
}