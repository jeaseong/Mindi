import React from 'react';
import { Line } from '../bambooView/bambooView.style';
import { CommentList } from './commentForm.style';

function SingleComment({ commentList }: any) {
  return (
    <>
      {commentList.map((rootComment: any) => (
        <>
          <CommentList>{rootComment.content}</CommentList>
          <Line />
        </>
      ))}
    </>
  );
}

export default SingleComment;
