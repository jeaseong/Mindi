import React, { useMemo } from 'react';
import { Chart as ChartJS } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Image from 'components/atoms/image/Image';
import { EMOTION } from 'utils/constants';
import { SENTIMENTS } from 'utils/image';
import { selectSentimentValues, selectSentimentNames } from 'utils/utils';
import { EmotionProps } from 'types/atoms';
import {
  Container,
  ChartSizeBox,
  EmotionIcons,
  EmotionIcon,
  EmotionCount,
} from './Sentiments.style';

function Sentiments({ emotion }: EmotionProps) {
  const sentimentNames = useMemo(() => selectSentimentNames(emotion), []);
  const sentimentValues = selectSentimentValues(emotion);

  const data = {
    labels: sentimentNames,
    datasets: [
      {
        label: '기분별 횟수',
        data: sentimentValues,
        backgroundColor: [
          '#ff8650',
          '#9b6ef3',
          '#ff555e',
          '#83b2ff',
          '#ffe981',
          '#8bf18b',
        ],
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '기분별 횟수',
        font: {
          size: 16,
        },
        padding: 14,
      },
    },
  };
  return (
    <Container>
      <ChartSizeBox>
        <Doughnut data={data} options={options}></Doughnut>
      </ChartSizeBox>
      <EmotionIcons>
        {sentimentNames?.map((emotion, index) => {
          const upperEmotion = emotion.toUpperCase();
          return (
            <EmotionIcon key={emotion}>
              <Image
                src={SENTIMENTS[upperEmotion].url}
                alt={SENTIMENTS[upperEmotion].alt}
                width='100%'
              />
              <EmotionCount color={EMOTION[upperEmotion].label.en}>
                {sentimentValues && sentimentValues[index]}
              </EmotionCount>
              {EMOTION[upperEmotion].label.ko}
            </EmotionIcon>
          );
        })}
      </EmotionIcons>
    </Container>
  );
}

export default Sentiments;
