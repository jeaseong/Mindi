import React, { useState, useCallback } from 'react';
import MainTitle from 'components/atoms/text/MainTitle';
import Text from 'components/atoms/text/Text';
import Sentiment from 'components/modules/static/sentiment/Sentiments';
import Keyword from 'components/modules/static/keyword/Keyword';
import Reminder from 'components/modules/static/reminder/Reminder';
import Loader from 'components/modules/loader/Loader';
import { useGetStatics } from 'hooks/staticsQuery';
import { DATE } from 'utils/constants';
import { Container, Navigation, NavBtn } from './Static.style';

function Static() {
  const curDate = new Date();
  const [year, setYear] = useState(curDate.getFullYear());
  const [month, setMonth] = useState(curDate.getMonth());
  const { statics, isLoading } = useGetStatics(
    `${year}-${month >= 10 ? month : `0${month}`}`,
  );

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
      <Navigation>
        <NavBtn onClick={() => onChangeMonth(-1)}>&lt;</NavBtn>
        <Text align='center' size='md'>
          {year}. {DATE.MONTH[month - 1]}
        </Text>
        <NavBtn onClick={() => onChangeMonth(1)}>&gt;</NavBtn>
      </Navigation>
      <Sentiment emotion={statics?.emotions} />
      <Keyword keywords={statics?.keywords} />
      <Reminder reminder={statics?.reminder} />
    </Container>
  );
}

export default Static;
