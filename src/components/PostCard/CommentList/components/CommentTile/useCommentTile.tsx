/* eslint-disable react-hooks/exhaustive-deps */
import useClientHTTP from "@/hooks/useClientHTTP";
import { CommentInterface } from "@/interfaces/Comment";
import { ResponsePageInterface } from "@/interfaces/ResponsePage";
import React from "react";

export interface CommentTileProps extends CommentInterface {
  highlightReplayComment?: CommentInterface.ReplyType
}

export default function useCommentTile(props: CommentTileProps) {
  const [showReactionUsersModal, setShowReactionUsersModal] = React.useState(false)
  const [pageNumber, setPageNumber] = React.useState<number>(0)
  const [pageSize, setPageSize] = React.useState<number>(10)
  const [showReplyComments, setShowReplyComments] = React.useState(false)
  const [replayComments, setReplayComments] = React.useState<CommentInterface.ReplyType[]>([])
  // const [haveHighlightReplayComment, setHaveHighlightReplayComment] = React.useState(false)
  const clientHTTP = useClientHTTP();

  const loadReplayComments = React.useCallback(async (pagination?: ResponsePageInterface.PaginationType, cb?: (replies: CommentInterface.ReplyType[]) => void) => {
    console.log("xxxx")
    clientHTTP.getAllCommentReply(props.id, pagination).then(page => {
      setPageNumber(page.pageable.pageNumber + 1)
      setPageSize(page.pageable.pageSize)
      if (cb) return cb(page.content);
      setReplayComments(page.content)
    })
  }, [clientHTTP])

  const loadMoreReplyComments = (endDate: string) => () => loadReplayComments({
    pageNumber,
    endDate
  }, replies => setReplayComments(prev => [...prev, ...replies]))

  return {
    replayComments,
    loadMoreReplyComments,
    showReplyComments,
    setShowReplyComments,
    showReactionUsersModal,
    setShowReactionUsersModal,
  }
}