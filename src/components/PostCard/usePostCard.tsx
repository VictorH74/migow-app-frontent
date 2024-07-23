/* eslint-disable react-hooks/exhaustive-deps */
import useClientHTTP from '@/hooks/useClientHTTP';
import { CommentInterface } from '@/interfaces/Comment';
import { PostInterface } from '@/interfaces/Post';
import React from 'react';

export interface PostCardProps extends PostInterface {
  fromPost?: boolean
  showBottomActions?: boolean
  showBottomInf?: boolean
  highlightComment?: CommentInterface,
  highlightReplayComment?: CommentInterface.ReplyType
  fromActivity?: boolean

}

export const commentPageLimit = 10

export default function usePostCard(props: PostCardProps) {
  const [showReactionUsersModal, setShowReactionUsersModal] = React.useState(false)
  const [pageNumber, setPageNumber] = React.useState<number>(0)
  const [comments, setComments] = React.useState<CommentInterface[]>([])
  const [highlightCommentId, setHighlightCommentId] = React.useState<string | undefined>(undefined)
  const clientHTTP = useClientHTTP();

  const recoveredAllComments = React.useMemo(() => comments.length >= props.commentCount, [comments, props.commentCount])

  React.useEffect(() => {
    if (props.highlightComment) {
      setComments([props.highlightComment!])
      setHighlightCommentId(props.highlightComment!.id)
    } else if (props.highlightReplayComment) {
      clientHTTP.getCommentById(props.highlightReplayComment!.comment).then(comment => {
        setComments([comment])
        setHighlightCommentId(props.highlightReplayComment!.comment)
      })
    }
  }, [props.highlightComment, props.highlightReplayComment, clientHTTP])

  const loadComments = React.useCallback(async (endDate: string = "") => {
    const page = await clientHTTP.getAllPostComment(props.id, { endDate })
    setComments(prev => [...prev, ...page.content])
    setPageNumber(prev => prev + 1)
  }, [props.id])

  return { comments, loadComments, pageNumber, recoveredAllComments, showReactionUsersModal, setShowReactionUsersModal }
}