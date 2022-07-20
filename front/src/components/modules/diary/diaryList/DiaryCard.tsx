import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import SubTitle from 'components/atoms/text/SubTitle';
import { getDateForString, convertUtcToKst } from 'utils/utils';
import { ListProps } from 'types/atoms';
import { DiaryPosts, DiaryPost, PreviewPost } from './DiaryCard.style';

function DiaryCard({ year, month }: ListProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const date = getDateForString(year, month, 0, 'perMonth');
  const diaries: any = queryClient.getQueryData(['diary', date]);
  const onClickDiary = (utc: Date) => {
    const date = convertUtcToKst(utc);
    navigate(`/result/${date}`);
  };
  return (
    <DiaryPosts>
      {diaries?.map((d: any) => (
        <DiaryPost onClick={() => onClickDiary(d.diaryDate)} key={d._id}>
          <SubTitle>{convertUtcToKst(d.diaryDate)}</SubTitle>
          <PreviewPost>{d.feeling}</PreviewPost>
        </DiaryPost>
      ))}
    </DiaryPosts>
  );
}

export default React.memo(DiaryCard);
