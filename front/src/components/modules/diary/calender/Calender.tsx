import React, { useState, useEffect, useMemo } from 'react';
import Head from './head/Head';
import Body from './body/Body';
import { nullCheck } from 'utils/nullCheck';
import { CalenderBodyProps, CalenderHeadProps } from 'types/atoms';
import { Container } from './Calender.style';
function Calender() {
  const DATE: Date = new Date();
  const YEAR: number = DATE.getFullYear();
  const MONTH: number = DATE.getMonth();
  const TODAY = DATE.getDate();
  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [totalDate, setTotalDate] = useState<string[][] | undefined>();

  const onChangeMonth = (m: number) => {
    if (month === 11 && m > 0) {
      setMonth(0);
      setYear((cur) => cur + 1);
      return;
    } else if (month === 0 && m < 0) {
      setMonth(11);
      setYear((cur) => cur - 1);
      return;
    }
    setMonth((cur) => cur + m);
  };

  useEffect(() => {
    // 이번 달의 1일이 무슨 요일
    const firstDay = new Date(year, month, 1).getDay();
    //이번 달 길이
    const nowDayLength = new Date(year, month + 1, 0).getDate();
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
