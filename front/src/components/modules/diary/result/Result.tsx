import React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import Image from 'components/atoms/image/Image';
import { IMAGE } from 'utils/image';
import {
  ContentWrapper,
  Title,
  Emotion,
  ChartTitle,
  ChartWrapper,
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

  const { sentiment }: any = mockData;

  const sent = Object.keys(sentiment);
  const sentValues = Object.values(sentiment);
  const keysSorted = Object.keys(sentiment).sort(
    (a, b) => sentiment[a] - sentiment[b],
  );

  const max = keysSorted.pop();

  console.log(keysSorted);

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
      <Image width='47%' src={IMAGE.HAPPY.url} alt={IMAGE.HAPPY.alt} />
      <ChartTitle>오늘의 감정 그래프</ChartTitle>
      <ChartWrapper>
        <Doughnut data={data} />
      </ChartWrapper>
    </ContentWrapper>
  );
}

export default Result;
