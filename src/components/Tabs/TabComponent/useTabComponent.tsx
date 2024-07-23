/* eslint-disable react-hooks/exhaustive-deps */
import useDebounce from "@/hooks/useDebounce";
import { ResponsePageInterface } from "@/interfaces/ResponsePage";
import React from "react";

export interface TabComponentProps<UserT> {
    children(user: UserT): React.ReactNode;
    queryFunc(inputValue: string): Promise<ResponsePageInterface<UserT>>
    tabIndex: number;
    currentTabIndex: number;

}

// TODO: implements infinity scroll
export default function useTabComponent<UserT>(props: TabComponentProps<UserT>) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [loading, setLoading] = React.useState(true)
    const [inputValue, setInputValue] = React.useState("")
    const [pageNumber, setPageNumber] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(10)
    const debounce = useDebounce();
    const [users, setUsers] = React.useState<UserT[]>([])

    React.useEffect(() => {
        if (props.currentTabIndex === props.tabIndex && users.length === 0) findUsers()
    }, [props.currentTabIndex])

    React.useEffect(() => {
        if (inputValue && props.currentTabIndex === props.tabIndex) {
            setPageNumber(0)
            debounce(findUsers, 300);
        }
    }, [inputValue])

    React.useEffect(() => {
        if (users.length === 0) return;
        findUsers(true)
    }, [pageNumber, pageSize])

    const findUsers = async (includesRetrievedUsers?: boolean) => {
        setLoading(true)


        const retrievedUsers = await props.queryFunc(inputValue);

        includesRetrievedUsers ? setUsers(prev => [...prev, ...retrievedUsers.content]) : setUsers(retrievedUsers.content)

        setLoading(false)

        inputRef.current?.focus()
    }

    const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return {
        inputValue,
        handleInputValueChange,
        loading,
        users,
    }
}