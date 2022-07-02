import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  getCommentList,
  postComment,
  deleteComment,
  putComment,
} from '../../../../api/api';
import {
  CommentWrapper,
  CommentContainer,
  CommentTitle,
  CommentLine,
  CommentText,
  CommentInput,
  CommentButton,
} from './commentForm.style';
import SingleComment from './singleComment';

const CommentForm = ({ postId }: any) => {
  const commentContentsRef = useRef<HTMLTextAreaElement>(null);
  const [commentList, setCommentList] = useState<any[]>([]);
  const [activeComment, setActiveComment] = useState(null);

  const getReplies = (commentId: any) =>
    commentList.filter((Comment) => Comment._id === commentId);

  const addComment = (postId: any, content: any) => {
    postComment(postId, content).then((comment) => {
      setCommentList([comment, ...commentList]);
      setActiveComment(null);
    });
  };

  const updateComment = (commentId: any, comment: any) => {
    putComment(commentId, comment).then(() => {
      const updatedComments = commentList.map((Comment) => {
        if (Comment._id === commentId) {
          return { ...Comment, body: comment };
        }
        return Comment;
      });
      setCommentList(updatedComments);
      setActiveComment(null);
    });
  };

  const delComment = (commentId: any) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteComment(commentId).then(() => {
        const updatedComments = commentList.filter(
          (Comment) => Comment._id !== commentId,
        );
        setCommentList(updatedComments);
      });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (commentContentsRef.current !== null) {
      postComment(postId, { content: commentContentsRef.current.value })
        .then(() => {
          setActiveComment(null);
          getPost();
        })
        .catch((err) => {
          console.log('등록에 실패했습니다!', err);
        });
      commentContentsRef.current.value = '';
    }
  };

  const getPost = async () => {
    const data = await getCommentList(postId);
    try {
      setCommentList(data);
    } catch {
      console.log(data);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <CommentWrapper>
      <CommentTitle>Comments</CommentTitle>
      <CommentText>
        <SingleComment commentList={commentList} />
      </CommentText>
      <CommentContainer onSubmit={onSubmit}>
        <CommentInput ref={commentContentsRef} placeholder='댓글 작성하기' />
        <CommentButton onClick={onSubmit}>등록</CommentButton>
      </CommentContainer>
    </CommentWrapper>
  );
};

export default CommentForm;
