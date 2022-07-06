import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetDiaryList } from 'hooks/diaryQuery';
import SubTitle from 'components/atoms/text/SubTitle';
import Text from 'components/atoms/text/Text';
import Image from 'components/atoms/image/Image';
import Button from 'components/atoms/button/Button';
import { getDateForString, selectMaxSentiment, getCurDate } from 'utils/utils';
import { PreviewProps } from 'types/atoms';
import { SENTIMENTS } from 'utils/image';
import {
  Container,
  PreviewBox,
  PreviewSentiment,
  NavigateBox,
} from './Preview.style';

function Preview({ year, month, day }: PreviewProps) {
  const today = getCurDate();
  const navigate = useNavigate();
  const date = getDateForString(year, month, day, 'perDay');
  const { diary, isFetching, isLoading } = useGetDiaryList(date, 'day');

  const isOverToday = useMemo(() => today < date, [today, date]);

  const onClickTo = (type: string) => {
    if (type === 'posting') {
      navigate(`/diary-posting/${date}`, {
        state: {
          date,
        },
      });
    } else if (type === 'result') {
      navigate(`/result/${date}`, {
        state: {
          date,
        },
      });
    } else if (type === 'edit') {
      navigate(`/diary-edit/${date}`, {
        state: {
          date,
        },
      });
    }
  };

  let sentiment = '';
  if (!isFetching && diary.length > 0) {
    sentiment = selectMaxSentiment(diary[0].sentiment).toUpperCase();
  }

  if (isLoading) {
    return (
      <Container>
        <SubTitle>
          {year}. {month}. {day}
        </SubTitle>
        <PreviewBox></PreviewBox>
      </Container>
    );
  } else if (!isLoading && sentiment === '') {
    return (
      <Container>
        <SubTitle>
          {year}. {month}. {day}
        </SubTitle>
        <PreviewBox>
          <Text size='sm' align='center'>
            {isOverToday
              ? '일기는 지난 날만 작성이 가능해요!'
              : '일기 작성을 안 했어요!'}
          </Text>
          <PreviewSentiment>
            <Image
              src={SENTIMENTS.SADNESS.url}
              alt={SENTIMENTS.SADNESS.alt}
              width='100px'
            />
          </PreviewSentiment>
          <NavigateBox>
            <Text size='sm'>일기 써주세요ㅠ</Text>
            <Button disabled={isOverToday} onClick={() => onClickTo('posting')}>
              일기 쓰러가기 &rarr;
            </Button>
          </NavigateBox>
        </PreviewBox>
      </Container>
    );
  }
  return (
    <Container>
      <SubTitle>
        {year}. {month}. {day}
      </SubTitle>
      <PreviewBox>
        <Text size='sm' align='center'>
          {SENTIMENTS[sentiment].comment}
        </Text>
        <PreviewSentiment>
          <Image
            src={SENTIMENTS[sentiment].url}
            alt={SENTIMENTS[sentiment].alt}
            width='100px'
          />
        </PreviewSentiment>
        <NavigateBox>
          <Button onClick={() => onClickTo('edit')}>
            일기 수정하기 &rarr;
          </Button>
          <Button onClick={() => onClickTo('result')}>
            일기 결과보기 &rarr;
          </Button>
        </NavigateBox>
      </PreviewBox>
    </Container>
  );
}

export default Preview;
