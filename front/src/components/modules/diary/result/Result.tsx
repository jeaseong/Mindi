import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Doughnut, Line } from 'react-chartjs-2';
import YouTube from 'react-youtube';
import Image from 'components/atoms/image/Image';
import Button from 'components/atoms/button/Button';
import { SENTIMENTS } from '../../../../utils/ResultImgData';
import { getCurDate } from 'utils/utils';
import { useNavigate } from 'react-router-dom';
import { getDiaryList, getDiaryListTemp } from 'api/api';
import {
  ContentWrapper,
  Title,
  Emotion,
  SubTitle,
  ChartWrapper,
  YouTubeWrapper,
  ButtonWrapper,
  ResultButton,
} from './Result.style';
import { LineBottom } from 'components/atoms/pageTitle/pageTitle.style';

function Result() {
  const navigate = useNavigate();
  const [diaryData, setDiaryData] = useState();

  const curDate = getCurDate();
  const strSplit = curDate.split('-');

  useEffect(() => {
    getDiaryList(strSplit[0], strSplit[1], strSplit[2]).then((data) => {
      setDiaryData(data[0].sentiment);
      console.log(diaryData);
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
  const selectMaxSentiment = (diaryData: any) => {
    if (diaryData) {
      const keysSorted = Object.keys(diaryData).sort(
        (a, b) => diaryData[a] - diaryData[b],
      );
      const max = keysSorted.pop()?.toUpperCase();
      return max;
    }
  };

  const diaryDataMax = selectMaxSentiment(diaryData);

  // 차트 감정 이름, 감정 값 구하기

  const selectSentimentNames = (diaryData: any) => {
    if (diaryData) {
      const sentimentNames = Object.keys(diaryData);
      return sentimentNames;
    }
  };
  const selectSentimentValues = (diaryData: any) => {
    if (diaryData) {
      const sentimentValues: Array<number> = Object.values(diaryData);

      return sentimentValues;
    }
  };

  const sentimentNames = selectSentimentNames(diaryData);

  const sentimentValues = selectSentimentValues(diaryData);
  console.log(diaryDataMax, sentimentNames, sentimentValues);

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

  if (diaryData === undefined) return <></>;
  return (
    <ContentWrapper>
      <Title>오늘의 감정 분석 결과:</Title>

      <Emotion>{diaryDataMax}</Emotion>
      <Image
        width='47%'
        src={SENTIMENTS[diaryDataMax as string].url}
        alt={SENTIMENTS[diaryDataMax as string].alt}
      />
      <SubTitle>오늘의 감정 그래프</SubTitle>
      <ChartWrapper>
        <Doughnut data={data} />
      </ChartWrapper>
      <SubTitle>오늘의 추천 음악</SubTitle>
      <YouTubeWrapper>
        <YouTube videoId='E0COLl4M1i4' opts={videoOptions} />
      </YouTubeWrapper>
      <ButtonWrapper>
        <LineBottom />
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
