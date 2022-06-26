import React from 'react';
import { useGetDiaryList } from 'hooks/diaryQuery';
import SubTitle from 'components/atoms/text/SubTitle';
import { getCurDate } from 'utils/utils';
import { IMAGE } from 'utils/image';
import { DiaryPosts, DiaryPost, PreviewPost } from './DiaryCard.style';

function DiaryCard() {
  const curDate = getCurDate();
  const year = curDate.slice(0, 4);
  const month = curDate.slice(5, 7);
  const { diary, isFetching } = useGetDiaryList(year, month, '00');
  return (
    <DiaryPosts>
      {isFetching
        ? 'loading'
        : diary?.map((d: any, index: number) => (
            <DiaryPost key={d._id}>
              <SubTitle>{d.diaryDate}</SubTitle>
              <PreviewPost bgImg={d?.imageFilePath}>{d.feeling}</PreviewPost>
            </DiaryPost>
          ))}
    </DiaryPosts>
  );
}

export default React.memo(DiaryCard);
