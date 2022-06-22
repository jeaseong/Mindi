import React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import YouTube from 'react-youtube';
import Image from 'components/atoms/image/Image';
import { getDiaryList } from 'api/api';
import { IMAGE } from 'utils/image';
import {
  ContentWrapper,
  Title,
  Emotion,
  SubTitle,
  ChartWrapper,
  YouTubeWrapper,
} from './Result.style';

function Result() {
  const mockData = {
    success: 'true',
    sentiment: {
      fear: 0,
      surprised: 1,
      anger: 0,
      sadness: 0,
      happiness: 1,
      aversion: 0,
    },
  };

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

  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  const dateString = year + '-' + month + '-' + day;

  const Data = getDiaryList(dateString);

  console.log(Data);

  const dataProto = Object.keys(Data);

  const { sentiment }: any = mockData;

  const sent = Object.keys(sentiment);
  const sentValues = Object.values(sentiment);
  const keysSorted = Object.keys(sentiment).sort(
    (a, b) => sentiment[a] - sentiment[b],
  );

  const max = keysSorted.pop();

  // console.log(keysSorted);

  const data = {
    datasets: [
      {
        label: "Today's Emotion Dataset",
        data: sentValues,
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
    labels: sent,
  };

  return (
    <ContentWrapper>
      <Title>오늘의 감정 분석 결과:</Title>

      <Emotion>{max}</Emotion>
      <Image width='47%' src={IMAGE.HAPPINESS.url} alt={IMAGE.HAPPINESS.alt} />
      <SubTitle>오늘의 감정 그래프</SubTitle>
      <ChartWrapper>
        <Doughnut data={data} />
      </ChartWrapper>
      <SubTitle>오늘의 추천 음악</SubTitle>
      <YouTubeWrapper>
        <YouTube videoId='E0COLl4M1i4' opts={videoOptions} />
      </YouTubeWrapper>
    </ContentWrapper>
  );
}

export default Result;
