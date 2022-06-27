import React from 'react';
import { useQueryClient } from 'react-query';
import SubTitle from 'components/atoms/text/SubTitle';
import { getDateForString } from 'utils/utils';
import { ListProps } from 'types/atoms';
import { DiaryPosts, DiaryPost, PreviewPost } from './DiaryCard.style';

function DiaryCard({ year, month }: ListProps) {
  const queryClient = useQueryClient();
  const date = getDateForString(year, month, 0);
  const diaries: any = queryClient.getQueryData([
    'diary',
    `${year}-${date.slice(5, 7)}-00`,
  ]);
  return (
    <DiaryPosts>
      {diaries?.map((d: any, index: number) => (
        <DiaryPost key={d._id}>
          <SubTitle>{d.diaryDate}</SubTitle>
          <PreviewPost bgImg={d?.imageFilePath}>{d.feeling}</PreviewPost>
        </DiaryPost>
      ))}
    </DiaryPosts>
  );
}

export default React.memo(DiaryCard);
