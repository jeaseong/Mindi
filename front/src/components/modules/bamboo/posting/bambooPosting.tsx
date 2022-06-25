import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BambooPostForm,
  BambooPostStyle,
  TodaysDate,
  InputArea,
  Input,
  ButtonArea,
} from './bambooPosting.style';
import Button from 'components/atoms/button/Button';

function BambooPosting() {
  const navigate = useNavigate();
  const bambooRef = useRef<HTMLTextAreaElement>(null);

  function onSubmit(e: any) {
    e.preventDefault();

    if (bambooRef.current !== null) {
      console.log(bambooRef.current.value);
    }
  }

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
          <Input
            ref={bambooRef}
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
