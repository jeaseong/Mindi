import React from 'react';
import BambooCard from 'components/modules/bamboo/bambooCard/bambooCard';
import {
  PageTitle,
  Lines,
  LineTop,
  LineBottom,
} from '../../atoms/pageTitle/pageTitle.style';
import {
  CardWrap,
  WriteButton,
  ButtonWrap,
  TitleWrap,
} from './bambooTemplate.style';

function BambooTemplate() {
  return (
    <>
      <TitleWrap>
        <PageTitle>
          Bamboo
          <br />
          Grove
        </PageTitle>
      </TitleWrap>
      <ButtonWrap>
        <WriteButton>글쓰기</WriteButton>
      </ButtonWrap>
      <Lines>
        <LineTop />
        <LineBottom />
      </Lines>

      <CardWrap>
        <BambooCard />
      </CardWrap>
    </>
  );
}

export default BambooTemplate;
