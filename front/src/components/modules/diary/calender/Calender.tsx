import React, { useState } from 'react';
import Head from './head/Head';
import Body from './body/Body';
function Calender() {
  const DATE: Date = new Date();
  const YEAR: number = DATE.getFullYear();
  const MONTH: number = DATE.getMonth();
  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [totalDate, setTotalDate] = useState([]);

  const onChangeMonth = (m: number) => {
    setMonth(m);
  };
  const HeadProps = {
    year,
    month,
    onChangeMonth,
  };
  return (
    <div>
      <Head {...HeadProps}></Head>
      <Body></Body>
    </div>
  );
}

export default Calender;
