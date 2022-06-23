import React, { useState } from 'react';
import Head from './head/Head';
import Body from './body/Body';
import { Container } from './Calender.style';
function Calender() {
  const DATE: Date = new Date();
  const YEAR: number = DATE.getFullYear();
  const MONTH: number = DATE.getMonth();
  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [totalDate, setTotalDate] = useState([]);

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
  const HeadProps = {
    year,
    month: month,
    onChangeMonth,
  };
  return (
    <Container>
      <Head {...HeadProps}></Head>
      <Body></Body>
    </Container>
  );
}

export default Calender;
