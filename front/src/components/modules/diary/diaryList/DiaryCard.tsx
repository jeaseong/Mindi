import React from 'react';
import { useGetDiaryList } from 'hooks/diaryQuery';
import SubTitle from 'components/atoms/text/SubTitle';
import { ListProps } from 'types/atoms';
import { DiaryPosts, DiaryPost, PreviewPost } from './DiaryCard.style';

function DiaryCard({ year, month }: ListProps) {
  const { diary, isFetching } = useGetDiaryList(
    `${year}`,
    `${month >= 10 ? month : `0${month}`}`,
    '00',
  );
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
