/* eslint-disable react-hooks/exhaustive-deps */
import { ReactionTypeEnum } from '@/enums';
import useClientHTTP from '@/hooks/useClientHTTP';
import { CommentInterface } from '@/interfaces/Comment';
import { PostInterface } from '@/interfaces/Post';
import { ReactionInterface } from '@/interfaces/Reaction';
import { ResponsePageInterface } from '@/interfaces/ResponsePage';
import { serverFetch } from '@/lib/actions';
import React from 'react';

export interface PostCardProps extends PostInterface {
  fromPost?: boolean
  showBottomActions?: boolean
  showBottomInf?: boolean
  highlightComment?: CommentInterface,
  highlightReplyComment?: CommentInterface.ReplyType
  fromActivity?: boolean

}

export default function usePostCard(props: PostCardProps) {
  const [showReactionUsersModal, setShowReactionUsersModal] = React.useState(false)
  const [showComments, setShowComments] = React.useState(false)
  const [pageNumber, setPageNumber] = React.useState<number>(0)
  const [pageSize, setPageSize] = React.useState<number>(10)
  const [comments, setComments] = React.useState<CommentInterface[]>([])
  // const [highlightCommentId, setHighlightCommentId] = React.useState<string | undefined>(undefined)
  const [isLoadingInitialData, setIsLoadingInitialData] = React.useState(true)
  const clientHTTP = useClientHTTP();

  const recoveredAllComments = React.useMemo(() => comments.length >= props.commentCount, [comments, props.commentCount])

  // const initialDataDate = React.useMemo(() => new Date().toISOString(), [])

  // React.useEffect(() => {
  //   if (props.highlightComment) {
  //     setComments([props.highlightComment!])
  //     setHighlightCommentId(props.highlightComment!.id)
  //   } else if (props.highlightReplyComment) {
  //     clientHTTP.getCommentById(props.highlightReplyComment!.comment).then(comment => {
  //       setComments([comment])
  //       setHighlightCommentId(props.highlightReplyComment!.comment)
  //     })
  //   }
  // }, [props.highlightComment, props.highlightReplyComment, clientHTTP])

  const loadComments = React.useCallback(async (pagination?: ResponsePageInterface.PaginationType, cb?: (comments: CommentInterface[]) => void) => {
    clientHTTP.getAllPostComment(props.id, pagination).then(page => {
      setPageNumber(page.pageable.pageNumber + 1) // to next query page
      setPageSize(page.pageable.pageSize)
      if (cb) return cb(page.content);
      setComments(page.content)
    })
  }, [clientHTTP])

  const loadMoreComments = (endDate: string) => () => loadComments({
    pageNumber,
    endDate
  }, comments => setComments(prev => [...prev, ...comments]))

  const addNewComment = async (content: string) => {
    const createdComment = await clientHTTP.createComment({ content, postId: props.id })
    setComments(prev => [createdComment, ...prev])
  }

  const createDeleteReaction = async () => {
    if (!!props.currentUserReaction) {
      await serverFetch<void>(`/p-s/reactions/${props.currentUserReaction.id}`, {
        method: "DELETE",
      })
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

    props.currentUserReaction = createdUpdatedReaction
  }

  return {
    comments,
    setComments,
    loadMoreComments,
    pageNumber,
    recoveredAllComments,
    showReactionUsersModal,
    setShowReactionUsersModal,
    showComments,
    setShowComments,
    isLoadingInitialData,
    addNewComment,
    createUpdateReaction,
    createDeleteReaction,
  }
}