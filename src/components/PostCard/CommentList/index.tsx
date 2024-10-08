import CommentTile from './components/CommentTile';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import usePost from '@/hooks/usePost';
import CreateCommentTile from './components/CreateCommentTile';
import Loading from '@/components/Loading';
import { CommentInterface } from '@/interfaces/Comment';
import { ActivityInterface } from '@/interfaces/Activity';

interface CommentListProps {
    postId: string;
    commentCount: number;
    highlightComment?: CommentInterface | undefined;
    highlightReplyComment?: ActivityInterface['replyComment'] | undefined;
    showComments: boolean;
    postFromPost?: boolean;
}

export default React.memo(
    React.forwardRef<HTMLTextAreaElement, CommentListProps>(
        function CommentList(props, ref) {
            const { comments, loadMoreComments } = usePost();
            const [enabled, setEnabled] = React.useState(false);

            const postFromPost = React.useMemo(() => props.postFromPost, []);

            const loadComments = React.useCallback(
                () =>
                    loadMoreComments(
                        props?.highlightComment?.id || '',
                        new Date().toISOString()
                    ),
                []
            );

            const { isLoading } = useQuery({
                queryKey: [props.postId + '-comments'],
                queryFn: loadComments(),
                retry: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                refetchOnMount: false,
                refetchInterval: false,
                enabled,
            });

            React.useEffect(() => {
                if (
                    props.commentCount > 0 &&
                    props.showComments &&
                    !props.highlightComment
                ) {
                    setEnabled(true);
                }
            }, [props.showComments]);

            if (isLoading) return <CommentListLoading />;

            return (
                <>
                    {!postFromPost && (
                        <CreateCommentTile
                            ref={ref}
                            avatarSxProps={{ marginTop: 0.3 }}
                            containerClassname="mb-2"
                        />
                    )}

                    <ul className="flex flex-col gap-3">
                        {(() => {
                            if (props.highlightComment)
                                return [props.highlightComment, ...comments];
                            if (props.highlightReplyComment)
                                return [
                                    {
                                        ...props.highlightReplyComment.comment,
                                        postId: props.postId,
                                    },
                                    ...comments,
                                ];
                            return comments;
                        })().map((c) => (
                            <CommentTile
                                key={c.id}
                                {...c}
                                highlightReplyComment={
                                    c.id ===
                                    props.highlightReplyComment?.comment.id
                                        ? props.highlightReplyComment
                                        : undefined
                                }
                            />
                        ))}
                    </ul>
                    {comments.length > 0 &&
                        comments.length < props.commentCount && (
                            <button
                                className="font-semibold hover:underline m-auto w-full"
                                onClick={loadComments}
                            >
                                Load more 10 comments
                            </button>
                        )}
                </>
            );
        }
    )
);

const CommentListLoading = () => (
    <div className="p-5 grid place-items-center">
        <Loading height={35} width={35} />
    </div>
);
