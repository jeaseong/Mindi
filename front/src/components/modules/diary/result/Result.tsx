import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import YouTube from 'react-youtube';
import Image from 'components/atoms/image/Image';
import Button from 'components/atoms/button/Button';
import { SENTIMENTS } from 'utils/image';
import { getCurDate } from 'utils/utils';
import { useNavigate } from 'react-router-dom';
import { getDiaryList } from 'api/api';
import {
  ContentWrapper,
  Title,
  Emotion,
  SubTitle,
  ChartWrapper,
  CharacterWrapper,
  YouTubeWrapper,
  ButtonWrapper,
  ResultButton,
  ButtonLine,
  CharacterEffect,
  DiaryWrapper,
  FeelingWrapper,
  DiaryAndFeeling,
} from './Result.style';
import { IMAGE } from 'utils/image';

function Result() {
  const navigate = useNavigate();
  const [sentimentData, setSentimentData] = useState();
  const [diaryData, setDiaryData] = useState();
  const [feelingData, setFeelingData] = useState();

  const curDate = getCurDate();
  const strSplit = curDate.split('-');

  useEffect(() => {
    getDiaryList(strSplit[0], strSplit[1], strSplit[2]).then((data) => {
      setSentimentData(data[0].sentiment);
      setDiaryData(data[0].diary);
      setFeelingData(data[0].feeling);
    });
  }, []);

  // 유튜브 비디오 옵션
  const videoOptions = {
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 0,
      loop: 0,
    },
  };

  // 점수가 가장 높은 감정 1개 반환
  const selectMaxSentiment = (sentimentData: any) => {
    if (sentimentData) {
      const keysSorted = Object.keys(sentimentData).sort(
        (a, b) => sentimentData[a] - sentimentData[b],
      );
      const max = keysSorted.pop()?.toUpperCase();
      return max;
    }
  };

  const diaryDataMax = selectMaxSentiment(sentimentData);

  // 차트 감정 이름, 감정 값 구하기

  const selectSentimentNames = (sentimentData: any) => {
    if (sentimentData) {
      const sentimentNames = Object.keys(sentimentData);
      return sentimentNames;
    }
  };
  const selectSentimentValues = (sentimentData: any) => {
    if (sentimentData) {
      const sentimentValues: Array<number> = Object.values(sentimentData);

      return sentimentValues;
    }
  };

  const sentimentNames = selectSentimentNames(sentimentData);

  const sentimentValues = selectSentimentValues(sentimentData);

  const data = {
    datasets: [
      {
        label: "Today's Emotion Dataset",
        data: sentimentValues,
        backgroundColor: [
          '#ff555e',
          '#ff8650',
          '#ffe981',
          '#8bf18b',
          '#83b2ff',
          '#9b6ef3',
        ],
        hoverOffset: 4,
      },
    ],
    labels: sentimentNames,
  };

  if (
    sentimentData === undefined ||
    diaryData === undefined ||
    feelingData === undefined
  )
    return <></>;
  return (
    <ContentWrapper>
      <Title>오늘의 감정 분석 결과:</Title>

      <Emotion>{diaryDataMax}</Emotion>
      <CharacterWrapper>
        <CharacterEffect
          width='16%'
          src={IMAGE.RESULT_EFFECT.url}
          alt={IMAGE.RESULT_EFFECT.alt}
        />
        <Image
          width='45%'
          src={SENTIMENTS[diaryDataMax as string].url}
          alt={SENTIMENTS[diaryDataMax as string].alt}
        />
      </CharacterWrapper>
      <DiaryAndFeeling>
        <SubTitle>오늘 한 일</SubTitle>
        <DiaryWrapper>{diaryData}</DiaryWrapper>
        <SubTitle>오늘 느낀 감정</SubTitle>
        <FeelingWrapper>{feelingData}</FeelingWrapper>
      </DiaryAndFeeling>
      <SubTitle>오늘의 감정 그래프</SubTitle>
      <ChartWrapper>
        <Doughnut data={data} />
      </ChartWrapper>
      <SubTitle>오늘의 추천 음악</SubTitle>
      <YouTubeWrapper>
        <YouTube videoId='E0COLl4M1i4' opts={videoOptions} />
      </YouTubeWrapper>
      <ButtonWrapper>
        <ButtonLine />
        <ResultButton>
          <Button
            onClick={() => {
              navigate('/diary');
            }}
          >
            Diary Page
          </Button>
        </ResultButton>
      </ButtonWrapper>
    </ContentWrapper>
  );
}

export default Result;
