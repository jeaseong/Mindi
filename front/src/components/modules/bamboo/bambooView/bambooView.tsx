import React, { useState, useCallback } from 'react';
import Modal from 'components/modules/bamboo/modal/modal';
import {
  CloseArea,
  ContentWrapper,
  DateTitleWrapper,
  ViewDate,
  ViewTitle,
  ViewText,
  TextWrapper,
} from './bambooView.style';
import { IoMdClose } from 'react-icons/io';

function BambooView({ curItem, modalClose }: any) {
  console.log('curItem', curItem);
  console.log(typeof curItem);

  console.log('isArray', Array.isArray(curItem));

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
        <TextWrapper>
          <ViewText>{curItem['content']}</ViewText>
        </TextWrapper>
      </ContentWrapper>
    </>
  );
}

export default BambooView;
