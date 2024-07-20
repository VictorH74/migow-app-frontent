/* eslint-disable react-hooks/exhaustive-deps */
import useDebounce from "@/hooks/useDebounce";
import { ResponsePageType, RetrievedUserType } from "@/types";
import React from "react";

export interface TabPanelProps {
    children(user: RetrievedUserType): React.ReactNode;
    queryFunc(inputValue: string): Promise<ResponsePageType<RetrievedUserType>>
    tabIndex: number;
    currentTabIndex: number;

}

export default function useTabComponent(props: TabPanelProps) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [loading, setLoading] = React.useState(true)
    const [inputValue, setInputValue] = React.useState("")
    const [pageNumber, setPageNumber] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(10)
    const debounce = useDebounce();
    const [users, setUsers] = React.useState<RetrievedUserType[]>([])

    React.useEffect(() => {
        if (props.currentTabIndex === props.tabIndex && users.length === 0) findUsers()
    }, [props.currentTabIndex])

    React.useEffect(() => {
        if (props.currentTabIndex === props.tabIndex) {
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
        loading,
        inputValue,
        setInputValue,
        pageNumber,
        setPageNumber,
        pageSize,
        setPageSize,
        handleInputValueChange,
        inputRef,
        users,
    }
}