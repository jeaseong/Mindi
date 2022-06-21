import React from 'react';
import { useGetDiaryList } from 'hooks/diaryQuery';
import { DiaryPosts, DiaryPost, Date, PreviewPost } from './DiaryCard.style';
import { IMAGE } from 'utils/image';
const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const date = '2022-10';
function DiaryCard() {
  const diaryList = useGetDiaryList(date);
  return (
    <DiaryPosts>
      {arr.map((v, index) => (
        <DiaryPost key={index}>
          <Date>2022.06.18 {v}</Date>
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
