import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Image from 'components/atoms/image/Image';
import { EMOTION } from 'utils/constants';
import { SENTIMENTS } from 'utils/image';
import { selectSentimentValues, selectSentimentNames } from 'utils/utils';
import { EmotionProps } from 'types/atoms';
import defaultValue from '../default.json';
import {
  Container,
  ChartSizeBox,
  EmotionIcons,
  EmotionIcon,
  EmotionCount,
  BlurBox,
  BlurText,
  ContainerMock,
  Text,
} from './Sentiments.style';

function Sentiments({ emotion }: EmotionProps) {
  const sentimentNames = selectSentimentNames(emotion);
  const sentimentValues = selectSentimentValues(emotion);
  const mockSentimentNames = useMemo(
    () => selectSentimentNames(defaultValue.result.emotions),
    [],
  );
  const mockSentimentValues = selectSentimentValues(
    defaultValue.result.emotions,
  );

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
  const mockData = {
    labels: mockSentimentNames,
    datasets: [
      {
        label: '기분별 횟수',
        data: mockSentimentValues,
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
  if (emotion === undefined) {
    return (
      <BlurBox>
        <Text>
          <BlurText>일기를 3개 이상 작성하면 확인할 수 있어요! </BlurText>
          <Link to='/diary'>일기 쓰러가기</Link>
        </Text>
        <ContainerMock>
          <ChartSizeBox>
            <Doughnut data={mockData} options={options}></Doughnut>
          </ChartSizeBox>
          <EmotionIcons>
            {mockSentimentNames?.map((emotion, index) => {
              const upperEmotion = emotion.toUpperCase();
              return (
                <EmotionIcon key={emotion}>
                  <Image
                    src={SENTIMENTS[upperEmotion].url}
                    alt={SENTIMENTS[upperEmotion].alt}
                    width='100%'
                  />
                  <EmotionCount color={EMOTION[upperEmotion].label.en}>
                    {mockSentimentValues && mockSentimentValues[index]}
                  </EmotionCount>
                  {EMOTION[upperEmotion].label.ko}
                </EmotionIcon>
              );
            })}
          </EmotionIcons>
        </ContainerMock>
      </BlurBox>
    );
  }
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
