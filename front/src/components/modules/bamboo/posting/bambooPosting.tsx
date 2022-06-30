import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BambooPostForm,
  BambooPostStyle,
  TodaysDate,
  InputArea,
  TextInput,
  TitleInput,
  ButtonArea,
} from './bambooPosting.style';
import Button from 'components/atoms/button/Button';
import { postBambooPosting } from 'api/api';
import { getCustomizedDate } from 'utils/utils';

function BambooPosting() {
  const navigate = useNavigate();
  const bambooTitleRef = useRef<HTMLInputElement>(null);
  const bambooTextRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (bambooTextRef.current !== null && bambooTitleRef.current !== null) {
      console.log(bambooTitleRef.current.value, bambooTextRef.current.value);

      postBambooPosting({
        title: bambooTitleRef.current.value,
        content: bambooTextRef.current.value,
      })
        .then(() => {
          alert('등록 완료!'), navigate('/bamboo-grove');
        })
        .catch((err) => {
          alert('등록에 실패했습니다!'), console.log(err);
        });
    }
  };

  const today = new Date();
  const dateString = getCustomizedDate(today);

  return (
    <BambooPostStyle>
      <BambooPostForm onSubmit={onSubmit}>
        <TodaysDate>{dateString}</TodaysDate>
        <InputArea>
          <TitleInput ref={bambooTitleRef} placeholder='제목을 적어주세요!' />
          <TextInput
            ref={bambooTextRef}
            placeholder='공유하고 싶은 감정을 적어주세요!'
          />
        </InputArea>
        <ButtonArea>
          <Button>등록</Button>
        </ButtonArea>
      </BambooPostForm>
    </BambooPostStyle>
  );
}

export default BambooPosting;
