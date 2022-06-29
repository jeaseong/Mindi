import React from 'react';
import {
  CloseArea,
  ContentWrapper,
  DateTitleWrapper,
  ViewDate,
  ViewTitle,
  ViewText,
  TextWrapper,
  Line,
  CommentWrapper,
  CommentTitle,
  CommentLine,
  CommentText,
  CommentInput,
  CommentButton,
} from './bambooView.style';
import { IoMdClose } from 'react-icons/io';

function BambooView({ curItem, modalClose }: any) {
  return (
    <>
      <CloseArea>
        <IoMdClose size={30} onClick={modalClose} />
      </CloseArea>
      <ContentWrapper>
        <DateTitleWrapper>
          <ViewDate>{curItem['createdAt'].substr(0, 10)}</ViewDate>
          <ViewTitle>{curItem['title']}</ViewTitle>
        </DateTitleWrapper>
        <Line />
        <TextWrapper>
          <ViewText>{curItem['content']}</ViewText>
        </TextWrapper>
        <CommentWrapper>
          <CommentTitle>Comments</CommentTitle>
          <CommentLine />
          <CommentText></CommentText>
        </CommentWrapper>
        <Line />
        <CommentInput />
        <CommentButton>댓글 달기</CommentButton>
      </ContentWrapper>
    </>
  );
}

export default BambooView;
