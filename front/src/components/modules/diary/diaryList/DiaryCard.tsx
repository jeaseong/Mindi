import React from 'react';
import { DiaryPosts, DiaryPost, Date, PreviewPost } from './DiaryCard.style';
import { IMAGE } from 'utils/image';
const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function DiaryCard() {
  return (
    <DiaryPosts>
      {arr.map((v, index) => (
        <DiaryPost key={index}>
          <Date>2022.06.18 {v}</Date>
          <PreviewPost bgImg={IMAGE.AUTH_LOGO.url}>뭐야 이거</PreviewPost>
        </DiaryPost>
      ))}
    </DiaryPosts>
  );
}

export default DiaryCard;
