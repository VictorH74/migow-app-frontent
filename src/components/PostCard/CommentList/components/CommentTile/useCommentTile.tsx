/* eslint-disable react-hooks/exhaustive-deps */
import useClientHTTP from "@/hooks/useClientHTTP";
import { CommentInterface } from "@/interfaces/Comment";
import { ResponsePageInterface } from "@/interfaces/ResponsePage";
import React from "react";

export interface CommentTileProps extends CommentInterface {
  highlightReplyComment?: CommentInterface.ReplyType
}

export default function useCommentTile(props: CommentTileProps) {
  const [showReactionUsersModal, setShowReactionUsersModal] = React.useState(false)
  const [pageNumber, setPageNumber] = React.useState<number>(0)
  const [pageSize, setPageSize] = React.useState<number>(10)
  const [showReplyComments, setShowReplyComments] = React.useState(false)
  const [showReplyInput, setShowReplyInput] = React.useState(false)
  const [replyComments, setReplyComments] = React.useState<CommentInterface.ReplyType[]>([])
  // const [haveHighlightReplyComment, setHaveHighlightReplyComment] = React.useState(false)
  const clientHTTP = useClientHTTP();

  const loadReplyComments = React.useCallback(async (pagination?: ResponsePageInterface.PaginationType, cb?: (replies: CommentInterface.ReplyType[]) => void) => {
    console.log("xxxx")
    clientHTTP.getAllCommentReply(props.id, pagination).then(page => {
      setPageNumber(page.pageable.pageNumber + 1)
      setPageSize(page.pageable.pageSize)
      if (cb) return cb(page.content);
      setReplyComments(page.content)
    })
  }, [clientHTTP])

  const loadMoreReplyComments = (endDate: string) => () => loadReplyComments({
    pageNumber,
    endDate
  }, replies => setReplyComments(prev => [...prev, ...replies]))

  const addNewComment = async (content: string) => {
    const createdComment = await clientHTTP.createReplyComment({ content, commentId: props.id })
    setReplyComments(prev => [createdComment, ...prev])
  }

  return {
    replyComments,
    loadMoreReplyComments,
    showReplyComments,
    setShowReplyComments,
    showReactionUsersModal,
    setShowReactionUsersModal,
    showReplyInput,
    setShowReplyInput,
    addNewComment
  }
}