import React from 'react';
import { useGetDiaryList } from 'hooks/diaryQuery';
import { getCurDate } from 'utils/utils';
import { IMAGE } from 'utils/image';
import { DiaryPosts, DiaryPost, Day, PreviewPost } from './DiaryCard.style';

function DiaryCard() {
  const curDate = getCurDate();
  const year = curDate.slice(0, 4);
  const month = curDate.slice(5, 7);
  const { diary, isFetching } = useGetDiaryList(year, month, '00');
  return (
    <DiaryPosts>
      {isFetching
        ? 'loading'
        : diary?.map((d, index) => (
            <DiaryPost key={d._id}>
              <Day>{d.diaryDate}</Day>
              <PreviewPost bgImg={IMAGE.AUTH_LOGO.url}>{d.feeling}</PreviewPost>
            </DiaryPost>
          ))}
    </DiaryPosts>
  );
}

export default DiaryCard;
