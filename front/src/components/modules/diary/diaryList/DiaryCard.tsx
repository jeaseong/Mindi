import React from 'react';
import { useGetDiaryList } from 'hooks/diaryQuery';
import { getCurDate } from 'utils/date';
import { IMAGE } from 'utils/image';
import { DiaryPosts, DiaryPost, Day, PreviewPost } from './DiaryCard.style';
const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function DiaryCard() {
  const curDate = getCurDate();
  const year = curDate.slice(0, 4);
  const month = curDate.slice(5, 7);
  const { diary, isFetching } = useGetDiaryList(year, month, '00');
  return (
    <DiaryPosts>
      {arr.map((v, index) => (
        <DiaryPost key={index}>
          <Day>2022.06.18 {v}</Day>
          <PreviewPost bgImg={IMAGE.AUTH_LOGO.url}>
            공포로 인해 타협하자 말 것이며, 남이 나에게 타협하는 것을
            두려워하지도 말라. 공포로 인해 타협하자 말 것이며, 남이 나에게
            타협하는 것을 두려워하지도 말라. 공포로 인해 타협하자 말 것이며,
            남이 나에게 타협하는 것을 두려워하지도 말라.
          </PreviewPost>
        </DiaryPost>
      ))}
    </DiaryPosts>
  );
}

export default DiaryCard;
