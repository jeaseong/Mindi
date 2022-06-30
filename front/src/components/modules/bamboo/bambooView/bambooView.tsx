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
} from './bambooView.style';
import { IoMdClose } from 'react-icons/io';
import Comment from '../comment/commentForm';

function BambooView({ curItem, modalClose }: any) {
  // console.log(curItem);

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
        <Comment postId={curItem['_id']} />
      </ContentWrapper>
    </>
  );
}

export default BambooView;
