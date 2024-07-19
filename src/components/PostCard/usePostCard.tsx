import { CommentInterface, ReplayCommentInterface, PostInterface } from '@/interfaces';
import { commentsMock } from '@/mockData';
import { PageResponse } from '@/types';
import React from 'react';

export interface PostCardProps extends PostInterface {
  fromPost?: boolean
  showBottomActions?: boolean
  showBottomInf?: boolean
  highlightComment?: CommentInterface,
  highlightReplayComment?: ReplayCommentInterface
  fromActivity?: boolean

}

export const commentPageLimit = 10

export default function usePostCard(props: PostCardProps) {
  const [page, setPage] = React.useState<number>(0)
  const [comments, setComments] = React.useState<CommentInterface[]>([])
  const [highlightCommentId, setHighlightComment] = React.useState<string | undefined>(undefined)

  const recoveredAllComments = React.useMemo(() => comments.length >= props.commentCount, [comments, props.commentCount])

  React.useEffect(() => {
    if (props.highlightComment) {
      setComments([props.highlightComment!])
      setHighlightComment(props.highlightComment!.id)
    } else if (props.highlightReplayComment) {
      setComments([props.highlightReplayComment!.comment])
      setHighlightComment(props.highlightReplayComment!.comment.id)
    }
  }, [])

  const loadComments = async () => {
    // TODO: fetch comments (page, size)
    // WITH CLIENTHTTP
    /*
    const response = await clientHTTP.fetchComments(props.id, page, commentPageLimit,haveHighlightComment)
    setComments(prev => [...prev, ...response])
    setPage(prev => prev + 1)
    */
    // WITH FETCH
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/p-s/comments/${props.id}`)
    const page = (await res.json()) as PageResponse<CommentInterface>
    setComments(prev => [...prev, ...page.content])
    setPage(prev => prev + 1)

    // const response = commentsMock.filter(
    //   c => c.post.id === props.id && c.id !== highlightCommentId
    // ).slice(page * commentPageLimit, page * commentPageLimit + commentPageLimit)
    // setComments(prev => [...prev, ...response])
    // setPage(prev => prev + 1)
  }

  return { comments, loadComments, page, recoveredAllComments }
}