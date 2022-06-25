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
          <PreviewPost bgImg={IMAGE.AUTH_LOGO.url}>
            익무 감동주의보 예매권당첨으로 관람했어요. 출발 비디오여행 소개로
            보고싶었는데 기회가 되서 즐겁게 관람했어요. 단순한 로맨스영화인줄
            알았다가 신선한 소재와 신선한 배우들의 연기들을 보는 재미가
            있었고요. 감독님의 연출이 서툴지만 그것까지 이쁘게 보였어요.
            스토리는 단순하지만 의미와 감동을 생각하면 풋풋한 로코에 웃음도
            주네요. 가족끼리 가서 관람해도 좋을것같아요 개봉관도 적고 상영시간도
            극악이지만 이런 작은영화도 힘들게 개봉해서 반갑네요.
          </PreviewPost>
        </DiaryPost>
      ))}
    </DiaryPosts>
  );
}

export default BambooCard;
