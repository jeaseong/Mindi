import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetDiaryList } from 'hooks/diaryQuery';
import SubTitle from 'components/atoms/text/SubTitle';
import Text from 'components/atoms/text/Text';
import Image from 'components/atoms/image/Image';
import Button from 'components/atoms/button/Button';
import { getDateForString, selectMaxSentiment } from 'utils/utils';
import { PreviewProps } from 'types/atoms';
import { IMAGE } from 'utils/image';
import {
  Container,
  PreviewBox,
  PreviewSentiment,
  NavigateBox,
} from './Preview.style';

function Preview({ year, month, day }: PreviewProps) {
  const navigate = useNavigate();
  const date = getDateForString(year, month, day);
  const { diary, isLoading } = useGetDiaryList(
    `${year}`,
    `${date.slice(5, 7)}`,
    `${date.slice(8, 10)}`,
  );

  const onClickToPosting = () => {
    navigate('/diary-posting', {
      state: {
        date,
      },
    });
  };
  const onClickToResult = () => {
    navigate(`/result/${date}`, {
      state: {
        date,
      },
    });
  };

  let sentiment;
  if (!isLoading && diary.length > 0) {
    sentiment = selectMaxSentiment(diary[0].sentiment);
  }

  if (!isLoading && sentiment === undefined) {
    return (
      <Container>
        <SubTitle>
          {year}. {month}. {day}
        </SubTitle>
        <PreviewBox>
          <Text size='sm' align='center'>
            일기 작성을 안 했어요!
          </Text>
          <PreviewSentiment>
            <Image src={IMAGE.HAPPY.url} alt={IMAGE.HAPPY.alt} width='40%' />
          </PreviewSentiment>
          <NavigateBox>
            <Text size='sm'>일기 써주세요ㅠ</Text>
            <Button onClick={onClickToPosting}>일기 쓰러가기 &rarr;</Button>
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
          기분에 따라 조언 하나씩 줘야함
        </Text>
        <PreviewSentiment>
          <Image src={IMAGE.HAPPY.url} alt={IMAGE.HAPPY.alt} width='40%' />
        </PreviewSentiment>
        <NavigateBox>
          <Button onClick={onClickToPosting}>일기 수정하기 &rarr;</Button>
          <Button onClick={onClickToResult}>일기 결과보기 &rarr;</Button>
        </NavigateBox>
      </PreviewBox>
    </Container>
  );
}

export default Preview;
