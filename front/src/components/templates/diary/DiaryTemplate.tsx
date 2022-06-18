import React from 'react';
import DiaryCard from 'components/modules/diary/diaryList/DiaryCard';
import { Wrap, DiaryCalendar, DiaryList } from './DiaryTemplate.style';
function DiaryTemplate() {
  return (
    <Wrap>
      <DiaryCalendar></DiaryCalendar>
      <DiaryList>
        <DiaryCard />
      </DiaryList>
    </Wrap>
  );
}

export default DiaryTemplate;
