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
import { useSnackbarContext } from 'contexts/SnackbarContext';

function BambooPosting() {
  const navigate = useNavigate();
  const bambooTitleRef = useRef<HTMLInputElement>(null);
  const bambooTextRef = useRef<HTMLTextAreaElement>(null);
  const { openSnackBar } = useSnackbarContext();

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (bambooTextRef.current !== null && bambooTitleRef.current !== null) {
      postBambooPosting({
        title: bambooTitleRef.current.value,
        content: bambooTextRef.current.value,
      })
        .then(() => {
          openSnackBar(true, '등록 완료!'), navigate('/bamboo-grove');
        })
        .catch(() => {
          openSnackBar(false, '등록에 실패했습니다!');
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
