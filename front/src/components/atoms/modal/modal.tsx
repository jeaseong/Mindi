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

function Modal({ date, text, onClick }: ModalProps) {
  return (
    <ModalWrapper>
      <DateWrapper>{date}</DateWrapper>
      <TextWrapper>{text}</TextWrapper>
      <CommentSpan>Comments</CommentSpan>
      <CommentText></CommentText>
      <Button onClick={onClick}>CLOSE</Button>
    </ModalWrapper>
  );
}

export default Modal;
