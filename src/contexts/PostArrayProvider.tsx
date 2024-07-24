"use client"
import useClientHTTP from "@/hooks/useClientHTTP"
import { PostInterface } from "@/interfaces/Post"
import { ResponsePageInterface } from "@/interfaces/ResponsePage"
import { GetAllPostFilterType } from "@/types"
import React from "react"

interface PostArrayCtxProps {
    filter: GetAllPostFilterType
    isLoadingInitialData: boolean,
    posts: PostInterface[],
    pageNumber: number
    pageSize: number

    setFilter: React.Dispatch<React.SetStateAction<GetAllPostFilterType>>
    setIsLoadingInitialData: React.Dispatch<React.SetStateAction<boolean>>
    setPosts: React.Dispatch<React.SetStateAction<PostInterface[]>>
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
    setPageSize: React.Dispatch<React.SetStateAction<number>>

    loadMorePost: () => Promise<void>
}

export const postArrayCtx = React.createContext<PostArrayCtxProps | null>(null)

export default function PostArrayProvider({ children }: React.PropsWithChildren) {
    const [filter, setFilter] = React.useState<GetAllPostFilterType>("recent")
    const [isLoadingInitialData, setIsLoadingInitialData] = React.useState(true)
    const [posts, setPosts] = React.useState<PostInterface[]>([])
    const [pageNumber, setPageNumber] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(10)

    const initialDataDate = React.useMemo(() => new Date().toISOString(), [])

    const clientHTTP = useClientHTTP();

    const loadPost = React.useCallback(async (pagination?: ResponsePageInterface.PaginationType, cb?: (posts: PostInterface[]) => void) => {
        clientHTTP.getAllFriendPost(filter, pagination).then(page => {
            setPageNumber(page.pageable.pageNumber)
            setPageSize(page.pageable.pageSize)
            if (cb) return cb(page.content);
            setPosts(page.content)
        })
    }, [clientHTTP, filter])

    React.useEffect(() => {
        loadPost({ endDate: initialDataDate })
            .then(() => setIsLoadingInitialData(false));
    }, [loadPost, initialDataDate])

    const loadMorePost = async () => loadPost({
        pageNumber: pageNumber + 1,
        endDate: initialDataDate
    }, posts => setPosts(prev => [...prev, ...posts]))

    return (
        <postArrayCtx.Provider
            value={{
                filter,
                isLoadingInitialData,
                posts,
                pageNumber,
                pageSize,
                setFilter,
                setIsLoadingInitialData,
                setPosts,
                setPageNumber,
                setPageSize,
                loadMorePost,
            }}
        >
            {children}
        </postArrayCtx.Provider>
    )
}