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

function EITestResult() {
  //useLocation state 타입 설정
  interface CustomizedState {
    [key: string]: number;
  }

  const location = useLocation();
  const state = location.state as CustomizedState;

  React.useEffect(() => {
    // 마운트 될 때 location 정보 출력
    console.log(state.selections);
  }, []);

  //점수 더하기
  let score = 0;

  const stateArray = Object.values(state.selections);

  for (const o in stateArray) {
    score += stateArray[o];
  }

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
          <Score>{score}</Score>
        </ScoreWrapper>
      </ImageWrapper>
      <DescriptionWrapper>
        <Description>
          {score >= 70 ? (
            <p>
              높은 감성 지수를 지니셨군요!
              <br /> 대나무숲에 감성 지수를 높힐 수 있는 노하우를 공유해주세요!
              :D
            </p>
          ) : (
            <p>
              감성 지수가 조금 낮으시군요..
              <br /> 하지만 걱정마세요! Mindi와 함께라면 감성 지수를 높힐 수
              있을 거예요! :D
            </p>
          )}
        </Description>
      </DescriptionWrapper>
      <StyledButtonDiv>
        <Button>가입하기</Button>
      </StyledButtonDiv>
    </EIResultTemplate>
  );
}

export default EITestResult;
