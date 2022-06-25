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
        .catch((err) => console.log(err));
    }
  };

  function getTodaysDate() {
    const today = new Date();

    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    const day = ('0' + today.getDate()).slice(-2);

    return year + '. ' + month + '. ' + day + '. ';
  }
  const dateString = getTodaysDate();

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
