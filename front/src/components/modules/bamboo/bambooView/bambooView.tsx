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
  Bamboo,
} from './bambooView.style';
import { IoMdClose } from 'react-icons/io';
import CommentForm from '../comment/commentForm';

function BambooView({ curItem, modalClose }: any) {
  return (
    <Bamboo>
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
        <CommentForm postId={curItem['_id']} />
      </ContentWrapper>
    </Bamboo>
  );
}

export default BambooView;
