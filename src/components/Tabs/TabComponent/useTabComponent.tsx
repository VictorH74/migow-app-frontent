/* eslint-disable react-hooks/exhaustive-deps */
import useDebounce from "@/hooks/useDebounce";
import { ResponsePageInterface } from "@/interfaces/ResponsePage";
import React from "react";

export interface TabComponentProps<UserT> {
    children(user: UserT, setUsers: React.Dispatch<React.SetStateAction<UserT[]>>): React.ReactNode;
    queryFunc(inputValue: string): Promise<ResponsePageInterface<UserT>>
    tabIndex: number;
    currentTabIndex: number;

}

// TODO: implements infinity scroll
export default function useTabComponent<UserT>(props: TabComponentProps<UserT>) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [loadingUsers, setLoadingUsers] = React.useState(true)
    const [inputValue, setInputValue] = React.useState("")
    const [pageNumber, setPageNumber] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(10)
    const debounce = useDebounce();
    const [users, setUsers] = React.useState<UserT[]>([])
    const [initial, setInitial] = React.useState(true);

    React.useEffect(() => {
        if (props.currentTabIndex === props.tabIndex) findUsers()
    }, [props.currentTabIndex])

    React.useEffect(() => {
        if (!initial && props.currentTabIndex === props.tabIndex) {
            setPageNumber(0)
            debounce(findUsers, 400);
            return;
        }
        setInitial(false)
    }, [inputValue])

    React.useEffect(() => {
        if (users.length === 0) return;
        findUsers(true)
    }, [pageNumber, pageSize])

    const findUsers = async (includesRetrievedUsers?: boolean) => {
        setLoadingUsers(true)


        const retrievedUsers = await props.queryFunc(inputValue);

        includesRetrievedUsers ? setUsers(prev => [...prev, ...retrievedUsers.content]) : setUsers(retrievedUsers.content)

        setLoadingUsers(false)

        inputRef.current?.focus()
    }

    const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return {
        inputValue,
        handleInputValueChange,
        loadingUsers,
        users,
        setUsers,
    }
}