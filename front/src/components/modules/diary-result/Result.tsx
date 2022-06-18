import React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { Title } from './Result.style';

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
    <>
      <Title>오늘의 감정 분석 결과:</Title>

      <p>{max}</p>
      <div style={{ height: '350px', width: '350px' }}>
        <Doughnut data={data} />
      </div>
    </>
  );
}

export default Result;
