import React, { useEffect, useState } from 'react';
import {
  DiaryPosts,
  DiaryPost,
  Date,
  Title,
  PreviewPost,
} from './bambooCard.style';
import { IMAGE } from 'utils/image';
import { getBambooList } from 'api/api';
import { getCustomizedDate } from 'utils/utils';

function BambooCard() {
  const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [bambooList, setBambooList] = useState<any[]>([]);
  const [bambooDate, setBambooDate] = useState('');

  useEffect(() => {
    getBambooList().then((res) => {
      console.log(res), setBambooList(res);
    });
  }, []);

  return (
    <DiaryPosts>
      {bambooList.map((item: any, index: any) => (
        <DiaryPost key={index}>
          <Date>{item.createdAt.substr(0, 10)}</Date>
          <Title>{item.title}</Title>
          <PreviewPost bgImg={IMAGE.AUTH_LOGO.url}>{item.content}</PreviewPost>
        </DiaryPost>
      ))}
    </DiaryPosts>
  );
}

export default BambooCard;
