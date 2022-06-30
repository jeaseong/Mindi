import { getCommentList, postComment } from 'api/api';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  CommentWrapper,
  CommentTitle,
  CommentLine,
  CommentText,
  CommentInput,
  CommentButton,
} from './commentForm.style';
import { Line } from '../bambooView/bambooView.style';

const CommentForm = ({ postId }: any) => {
  const commentContentsRef = useRef<HTMLTextAreaElement>(null);
  const [commentList, setCommentList] = useState<unknown[]>([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = commentList.filter(
    (comment: any) => comment._id === null,
  );

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (commentContentsRef.current !== null) {
      console.log(commentContentsRef.current.value);

      postComment(postId, { content: commentContentsRef.current.value })
        .then(() => {
          console.log('등록 완료!');
          setActiveComment(null);
        })
        .catch((err) => {
          console.log('등록에 실패했습니다!', err);
        });
    }
  };

  const getPost = async () => {
    const data = await getCommentList(postId);
    if (data) {
      setCommentList((prev) => [...prev, ...data]);
    } else {
      console.log(data);
    }

    // console.log(data);
    // console.log(page);
  };

  const getReplies = (commentId: any) =>
    commentList
      .filter((Comment: any) => Comment._Id === commentId)
      .sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );

  useEffect(() => {
    getPost();
  }, [postId]);

  console.log('commentList', commentList);

  return (
    <CommentWrapper onSubmit={onSubmit}>
      <CommentTitle>Comments</CommentTitle>
      <CommentLine />
      <CommentText>
        {commentList.map((value: any) => (
          <li key={value.something}>{value.content}</li>
        ))}
      </CommentText>
      <Line />
      <CommentInput ref={commentContentsRef} placeholder='댓글 작성하기' />
      <CommentButton>댓글 달기</CommentButton>
    </CommentWrapper>
  );
};

export default CommentForm;
