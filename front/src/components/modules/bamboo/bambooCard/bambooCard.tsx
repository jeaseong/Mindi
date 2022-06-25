import React from 'react';
import { DiaryPosts, DiaryPost, Date, PreviewPost } from './bambooCard.style';
import { IMAGE } from 'utils/image';

function BambooCard() {
  const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const date = '2022-10';

  return (
    <DiaryPosts>
      {arr.map((v, index) => (
        <DiaryPost key={index}>
          <Date>2022.06.18</Date>
          <PreviewPost bgImg={IMAGE.AUTH_LOGO.url}></PreviewPost>
        </DiaryPost>
      ))}
    </DiaryPosts>
  );
}

export default BambooCard;
