import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import Image from 'components/atoms/image/Image';
import { IMAGE } from 'utils/image';
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
interface CustomizedState {
  [key: string]: number;
}

function EITestResult() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userState = queryClient.getQueryData('userState');
  const location = useLocation();
  const [score, setScore] = useState(0);
  const state = location.state as CustomizedState;
  //점수 더하기

  const sumStateValue = () => {
    if (state !== null) {
      let sum = 0;
      const stateArray = Object.values(state?.selections);
      for (const o in stateArray) {
        sum += stateArray[o];
      }
      setScore(sum);
    }
  };

  useEffect(() => {
    sumStateValue();
  }, []);

  if (state === null) return <></>;
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
        {userState ? (
          <Button onClick={() => navigate('/diary')}>일기 쓰러가기</Button>
        ) : (
          <Button onClick={() => navigate('/sign-in')}>가입하기</Button>
        )}
      </StyledButtonDiv>
    </EIResultTemplate>
  );
}

export default EITestResult;
