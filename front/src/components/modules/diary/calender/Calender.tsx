import React, { useState, useEffect, useMemo } from 'react';
import Head from './head/Head';
import Body from './body/Body';
import { nullCheck, getCurDate } from 'utils/utils';
import {
  CalenderProps,
  CalenderBodyProps,
  CalenderHeadProps,
} from 'types/atoms';
import { Container } from './Calender.style';

function Calender({ onSetDay, onChangeMonth, month, year }: CalenderProps) {
  const [totalDate, setTotalDate] = useState<string[][] | undefined>();
  const TODAY = getCurDate();
  useEffect(() => {
    // makeCalenderDate
    // 이번 달의 1일이 무슨 요일
    const firstDay = new Date(year, month - 1, 1).getDay();
    //이번 달 길이
    const nowDayLength = new Date(year, month, 0).getDate();
    // 이번 달은 몇 주
    const weekLength = Math.ceil((nowDayLength - (6 - firstDay + 1)) / 7) + 1;

    let cnt = 1;
    const calenderDays = [];
    for (let i = 0; i < weekLength; i++) {
      const days = [];
      for (let j = 0; j < 7; j++) {
        if (cnt > nowDayLength) {
          days.push('');
        } else if (firstDay > j && i === 0) {
          days.push('');
        } else {
          days.push(`${cnt}`);
          cnt++;
        }
      }
      calenderDays.push(days);
    }
    setTotalDate(calenderDays);
  }, [month]);

  const bodyProps: CalenderBodyProps = {
    totalDate: nullCheck(totalDate),
    year,
    month,
    TODAY,
    onSetDay,
  };

  const headProps: CalenderHeadProps = useMemo(
    () => ({
      year,
      month,
      onChangeMonth,
    }),
    [year, month],
  );

  return (
    <Container>
      <Head {...headProps}></Head>
      <Body {...bodyProps}></Body>
    </Container>
  );
}

export default Calender;
