import React from 'react';
import { ModalProps } from 'types/atoms';
import Button from '../button/Button';
import {
  ModalWrapper,
  DateWrapper,
  TextWrapper,
  CommentSpan,
  CommentText,
} from './modal.style';
import Comments from '../comment/comments';

function Modal({ date, text, onClick }: ModalProps) {
  return (
    <ModalWrapper>
      <DateWrapper>{date}</DateWrapper>
      <TextWrapper>{text}</TextWrapper>
      <CommentSpan>Comments</CommentSpan>
      <CommentText>
        <Comments currentUserId='1' />
      </CommentText>
      <Button onClick={onClick}>CLOSE</Button>
    </ModalWrapper>
  );
}

export default Modal;
