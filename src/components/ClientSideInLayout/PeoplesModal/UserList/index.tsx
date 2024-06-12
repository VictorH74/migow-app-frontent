"use client"
import { UserInterface } from "@/interfaces";

// TODO: create 
interface UserListProps {
    promise(): Promise<Pick<UserInterface, "bgImageUrl" | "username">[]>
}

export default function UserList(props: UserListProps) {
    // const users = use()

}