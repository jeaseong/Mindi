import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubTitle from 'components/atoms/text/SubTitle';
import Text from 'components/atoms/text/Text';
import Image from 'components/atoms/image/Image';
import { selectMaxSentiment, convertUtcToKst } from 'utils/utils';
import { SENTIMENTS } from 'utils/image';
import {
  Container,
  ReminderDiaries,
  ReminderDiary,
  Head,
  DiaryPreview,
} from './Reminder.style';
const ORDER = ['첫 번째', '두 번째', '세 번째'];
function Reminder({ reminder }: any) {
  const navigate = useNavigate();

  const onClickDiary = (utc: Date) => {
    const date = convertUtcToKst(utc);
    navigate(`/result/${date}`);
  };

  return (
    <Container>
      <SubTitle size='sm'>AI가 기억하는 이달의 일기</SubTitle>
      <ReminderDiaries>
        {reminder?.map((diary: any, index: number) => {
          const maxEmotion = selectMaxSentiment(diary?.sentiment).toUpperCase();
          return (
            <ReminderDiary
              key={diary._id}
              onClick={() => onClickDiary(diary.diaryDate)}
            >
              <Head>
                <Text align='left' size='sm'>
                  {ORDER[index]} 일기
                </Text>
                <Image
                  src={SENTIMENTS[maxEmotion].url}
                  alt={SENTIMENTS[maxEmotion].alt}
                  width='30px'
                />
              </Head>
              {/* <ImgContainer>
                <Image
                  src={diary.imageFilePath}
                  alt='일기 썸네일'
                  width='100%'
                />
              </ImgContainer> */}
              <DiaryPreview>{diary.feeling}</DiaryPreview>
            </ReminderDiary>
          );
        })}
      </ReminderDiaries>
    </Container>
  );
}

export default Reminder;
