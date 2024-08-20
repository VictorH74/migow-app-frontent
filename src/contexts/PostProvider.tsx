import { ReactionTypeEnum } from "@/enums";
import useClientHTTP from "@/hooks/useClientHTTP";
import usePostArray from "@/hooks/usePostArray";
import { CommentInterface } from "@/interfaces/Comment";
import { PostInterface } from "@/interfaces/Post";
import { ReactionInterface } from "@/interfaces/Reaction";
import { ResponsePageInterface } from "@/interfaces/ResponsePage";
import { serverFetch } from "@/lib/actions";
import React from "react";

interface PostCtxProps {
    comments: CommentInterface[]
    loadMoreComments: (endDate: string) => () => Promise<void>
    createComment: (content: string) => Promise<void>
    createDeleteReaction: () => Promise<void>
    createUpdateReaction: (reactionType: ReactionTypeEnum) => Promise<void>
}

export const postCtx = React.createContext<PostCtxProps | null>(null)

interface PostProviderProps extends React.PropsWithChildren, PostInterface {
}

export default function PostProvider(props: PostProviderProps) {
    const [comments, setComments] = React.useState<CommentInterface[]>([])
    const [pageNumber, setPageNumber] = React.useState<number>(0)
    const [pageSize, setPageSize] = React.useState<number>(10)
    const { setPosts } = usePostArray();

    const clientHTTP = useClientHTTP();

    const loadComments = React.useCallback(async (pagination?: ResponsePageInterface.PaginationType, cb?: (comments: CommentInterface[]) => void) => {
        clientHTTP.getAllPostComment(props.id, pagination).then(page => {
            setPageNumber(page.pageable.pageNumber + 1) // to next query page
            setPageSize(page.pageable.pageSize)
            if (cb) return cb(page.content);
            setComments(page.content)
        })
    }, [clientHTTP, props.id])

    const loadMoreComments = (endDate: string) => () => loadComments({
        pageNumber,
        endDate
    }, comments => setComments(prev => [...prev, ...comments]))

    const createComment = React.useCallback(async (content: string) => {
        const createdComment = await clientHTTP.createComment({ content, postId: props.id })
        setComments(prev => [createdComment, ...prev])
        setPosts(prev => prev.map(p => p.id === props.id ? { ...p, commentCount: p.commentCount + 1 } : p))
    }, [clientHTTP, props.id, setPosts])

    const createDeleteReaction = async () => {
        if (!!props.currentUserReaction) {
            await serverFetch<void>(`/p-s/reactions/${props.currentUserReaction.id}`, {
                method: "DELETE",
            })
            return setPosts(prev => prev.map(p => p.id === props.id ? { ...p, currentUserReaction: undefined, reactCount: p.reactCount - 1 } : p))
        }

        createUpdateReaction(ReactionTypeEnum.LIKE);
    }

    const createUpdateReaction = async (reactionType: ReactionTypeEnum) => {
        if (!!props.currentUserReaction && props.currentUserReaction.type === reactionType) return

        const createdUpdatedReaction = await serverFetch<ReactionInterface.SimpleType>("/p-s/reactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: props.currentUserReaction?.id || null,
                type: reactionType,
                target: "post_" + props.id
            })
        })

        setPosts(prev => prev.map(p => p.id === props.id ? { ...p, currentUserReaction: createdUpdatedReaction, reactCount: p.reactCount + 1 } : p))
    }

    return (
        <postCtx.Provider value={{ comments, createComment, createDeleteReaction, createUpdateReaction, loadMoreComments, }}>
            {props.children}
        </postCtx.Provider>
    )
}