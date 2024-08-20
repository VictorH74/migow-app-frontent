/* eslint-disable react-hooks/exhaustive-deps */
import { ReactionTypeEnum } from '@/enums';
import useClientHTTP from '@/hooks/useClientHTTP';
import { CommentInterface } from '@/interfaces/Comment';
import { PostInterface } from '@/interfaces/Post';
import { ReactionInterface } from '@/interfaces/Reaction';
import { ResponsePageInterface } from '@/interfaces/ResponsePage';
import { serverFetch } from '@/lib/actions';
import React from 'react';

export interface PostCardProps {
  fromPost?: boolean
  showBottomActions?: boolean
  showBottomInf?: boolean
  highlightComment?: CommentInterface,
  highlightReplyComment?: CommentInterface.ReplyType
  fromActivity?: boolean
  post: PostInterface

}

export default function usePostCard() {
  const [showReactionUsersModal, setShowReactionUsersModal] = React.useState(false)
  const [showComments, setShowComments] = React.useState(false)
  // const [highlightCommentId, setHighlightCommentId] = React.useState<string | undefined>(undefined)

  return {
    showReactionUsersModal,
    setShowReactionUsersModal,
    showComments,
    setShowComments,
  }
}