import React, { useState, useCallback } from 'react';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import MainTitle from 'components/atoms/text/MainTitle';
import Buttom from 'components/atoms/button/Button';
import Text from 'components/atoms/text/Text';
import Sentiment from 'components/modules/static/sentiment/Sentiments';
import Keyword from 'components/modules/static/keyword/Keyword';
import Reminder from 'components/modules/static/reminder/Reminder';
import Loader from 'components/modules/loader/Loader';
import { useGetStatics } from 'hooks/staticsQuery';
import { postStatics, updateStatics } from 'api/api';
import { DATE } from 'utils/constants';
import { dateToString } from 'utils/utils';
import { Container, Navigation, NavBtn } from './Static.style';

function Static() {
  const { openSnackBar } = useSnackbarContext();
  const curDate = new Date();
  const m = curDate.getMonth();
  const [year, setYear] = useState(curDate.getFullYear());
  const [month, setMonth] = useState(curDate.getMonth());
  const { statics, isLoading } = useGetStatics(
    `${year}-${month >= 10 ? month : `0${month}`}`,
  );
  const isBlock = month === m;
  const yyyy = dateToString(year);
  const mm = dateToString(month);

  // 일기가 없을 때 새로 요청 & 일기가 많이 달라졌을 때 다시 분석 요청
  const postAnalysis = async () => {
    try {
      await postStatics(yyyy, mm);
    } catch (e) {
      openSnackBar(false, '최소한 일기를 10개는 작성해주세요..!');
    }
  };

  const putAnalysis = async () => {
    try {
      await updateStatics(yyyy, mm);
    } catch (e) {
      openSnackBar(false, '최소한 일기를 10개는 작성해주세요..!');
    }
  };
  // 월 네비게이션
  const onChangeMonth = useCallback((m: number) => {
    if (month === 12 && m > 0) {
      setMonth(1);
      setYear((cur) => cur + 1);
      return;
    } else if (month === 1 && m < 0) {
      setMonth(12);
      setYear((cur) => cur - 1);
      return;
    }
    setMonth((cur) => cur + m);
  }, []);

  if (isLoading) return <Loader>분석중입니다..!</Loader>;
  return (
    <Container>
      <MainTitle size='sm'>Mindi Static</MainTitle>
      <Buttom
        onClick={() => {
          statics ? putAnalysis() : postAnalysis();
        }}
      >
        {statics ? '분석을 다시 받고 싶어요!' : '분석을 받고 싶어요!'}
      </Buttom>
      <Navigation>
        <NavBtn onClick={() => onChangeMonth(-1)}>&lt;</NavBtn>
        <Text align='center' size='md'>
          {year}. {DATE.MONTH[month - 1]}
        </Text>
        <NavBtn disabled={isBlock} onClick={() => onChangeMonth(1)}>
          &gt;
        </NavBtn>
      </Navigation>
      <Sentiment emotion={statics?.emotions} />
      <Keyword keywords={statics?.keywords} />
      <Reminder reminder={statics?.reminder} />
    </Container>
  );
}

export default Static;
