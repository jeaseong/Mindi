import React from 'react';
import Calender from 'components/modules/diary/calender/Calender';
import DiaryCard from 'components/modules/diary/diaryList/DiaryCard';
import { Wrap, DiaryCalendar, DiaryList } from './DiaryTemplate.style';
function DiaryTemplate() {
  return (
    <Wrap>
      <DiaryCalendar>
        <Calender />
        <Calender />
      </DiaryCalendar>
      <DiaryList>
        <DiaryCard />
      </DiaryList>
    </Wrap>
  );
}

export default DiaryTemplate;
