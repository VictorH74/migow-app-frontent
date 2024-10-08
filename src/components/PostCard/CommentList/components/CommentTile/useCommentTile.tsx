/* eslint-disable react-hooks/exhaustive-deps */
import useClientHTTP from '@/hooks/useClientHTTP';
import { ActivityInterface } from '@/interfaces/Activity';
import { CommentInterface } from '@/interfaces/Comment';
import { ResponsePageInterface } from '@/interfaces/ResponsePage';
import React from 'react';

export interface CommentTileProps extends CommentInterface {
    highlightReplyComment?: ActivityInterface['replyComment'];
}

export default function useCommentTile(props: CommentTileProps) {
    const [showReactionUsersModal, setShowReactionUsersModal] =
        React.useState(false);
    const [pageNumber, setPageNumber] = React.useState<number>(0);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const [showReplyComments, setShowReplyComments] = React.useState(false);
    const [showReplyInput, setShowReplyInput] = React.useState(false);
    const [replyComments, setReplyComments] = React.useState<
        CommentInterface.ReplyType[]
    >([]);

    const clientHTTP = useClientHTTP();

    React.useEffect(() => {
        if (props.highlightReplyComment) {
            const reply = props.highlightReplyComment;
            const comment = reply.comment.id;
            setReplyComments((prev) => [{ ...reply, comment }, ...prev]);
        }
    }, []);
    React.useEffect(() => {
        console.log(replyComments);
    }, [replyComments]);

    const loadReplyComments = React.useCallback(
        async (
            pagination?: ResponsePageInterface.PaginationType,
            cb?: (replies: CommentInterface.ReplyType[]) => void
        ) => {
            clientHTTP.getAllCommentReply(props.id, pagination).then((page) => {
                setPageNumber(page.pageable.pageNumber + 1);
                setPageSize(page.pageable.pageSize);
                if (cb) return cb(page.content);
                setReplyComments(page.content);
            });
        },
        [clientHTTP]
    );

    const loadMoreReplyComments = (endDate: string) => () =>
        loadReplyComments(
            {
                pageNumber,
                endDate,
            },
            (replies) => setReplyComments((prev) => [...prev, ...replies])
        );

    const createReply = async (content: string) => {
        const createdComment = await clientHTTP.createReplyComment({
            content,
            commentId: props.id,
        });
        console.log('created reply comment ✅: ', createdComment);
        setReplyComments((prev) => [createdComment, ...prev]);
    };

    return {
        replyComments,
        loadMoreReplyComments,
        showReplyComments,
        setShowReplyComments,
        showReactionUsersModal,
        setShowReactionUsersModal,
        showReplyInput,
        setShowReplyInput,
        createReply,
    };
}
