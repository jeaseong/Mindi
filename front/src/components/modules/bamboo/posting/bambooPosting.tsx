import React from 'react';
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
  const today = new Date();

  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const year = today.getFullYear();
  const day = ('0' + today.getDate()).slice(-2);

  const dateString = year + '. ' + month + '. ' + day + '. ';

  return (
    <BambooPostStyle>
      <BambooPostForm>
        <TodaysDate>{dateString}</TodaysDate>
        <InputArea>
          <Input placeholder='공유하고 싶은 감정을 적어주세요' />
        </InputArea>
        <ButtonArea>
          <Button>등록</Button>
        </ButtonArea>
      </BambooPostForm>
    </BambooPostStyle>
  );
}

export default BambooPosting;
