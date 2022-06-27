import React, { useState } from 'react';
import Calender from 'components/modules/diary/calender/Calender';
import Preview from 'components/modules/diary/preview/Preview';
import DiaryCard from 'components/modules/diary/diaryList/DiaryCard';
import { DiaryCalendar, DiaryList } from './Diary.style';

function Diary() {
  const DATE: Date = new Date();
  const YEAR: number = DATE.getFullYear();
  const MONTH: number = DATE.getMonth();
  const DAY: number = DATE.getDate();
  const [month, setMonth] = useState(MONTH + 1);
  const [year, setYear] = useState(YEAR);
  const [day, setDay] = useState(DAY);

  const onSetDay = (d: number) => {
    setDay(d);
  };
  const onChangeMonth = (m: number) => {
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
  };

  return (
    <>
      <DiaryCalendar>
        <Preview year={year} month={month} day={day} />
        <Calender
          onSetDay={onSetDay}
          onChangeMonth={onChangeMonth}
          month={month}
          year={year}
        />
      </DiaryCalendar>
      <DiaryList>
        <DiaryCard year={year} month={month} />
      </DiaryList>
    </>
  );
}

export default Diary;
