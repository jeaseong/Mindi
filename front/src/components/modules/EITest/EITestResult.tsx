import React from 'react';
import Image from 'components/atoms/image/Image';
import { useLocation } from 'react-router-dom';
import { IMAGE } from 'components/utils/image';
import Button from 'components/atoms/button/Button';
import {
  EIResultTemplate,
  ImageWrapper,
  ScoreWrapper,
  ScoreTitle,
  Score,
  DescriptionWrapper,
  Description,
} from './EITestResult.style';
import { StyledButtonDiv } from './EITest.style';
import { CustomizedLocate } from 'components/types/atoms';

function EITestResult() {
  interface CustomizedState {
    [key: string]: string | undefined;
  }

  const location = useLocation();
  const state = location.state as CustomizedState;

  React.useEffect(() => {
    // 마운트 될 때 location 정보 출력
    console.log(state.selections);
  }, []);

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
      <StyledButtonDiv>
        <Button>가입하기</Button>
      </StyledButtonDiv>
    </EIResultTemplate>
  );
}

export default EITestResult;
