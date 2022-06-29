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
          '#ff555e',
          '#ff8650',
          '#ffe981',
          '#8bf18b',
          '#83b2ff',
          '#9b6ef3',
        ],
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
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
                width='70%'
              />
              <EmotionCount>{sentimentValues[index]}</EmotionCount>
              {EMOTION[upperEmotion].label.ko}
            </EmotionIcon>
          );
        })}
      </EmotionIcons>
    </Container>
  );
}

export default Sentiments;
