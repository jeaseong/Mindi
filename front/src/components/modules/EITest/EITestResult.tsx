import React from 'react';
import Image from 'components/atoms/image/Image';
import { useLocation } from 'react-router-dom';
import { IMAGE } from 'components/utils/image';
import {
  EIResultTemplate,
  ImageWrapper,
  ScoreWrapper,
  ScoreTitle,
  Score,
  DescriptionWrapper,
  Description,
} from './EITestResult.style';
function EITestResult() {
  const location = useLocation();

  return (
    <EIResultTemplate>
      <ImageWrapper>
        <Image
          width='47%'
          src={IMAGE.LOGO_EFFECT_LINE.url}
          alt={IMAGE.LOGO_EFFECT_LINE.alt}
        />
        <ScoreWrapper>
          <ScoreTitle>SCORE</ScoreTitle>
          <Score>60</Score>
        </ScoreWrapper>
      </ImageWrapper>
      <DescriptionWrapper>
        <Description>
          높은 감성 지수를 지니셨군요!
          <br /> 대나무숲에 감성 지수를 높힐 수 있는 노하우를 공유해주세요!
        </Description>
      </DescriptionWrapper>
    </EIResultTemplate>
  );
}

export default EITestResult;
