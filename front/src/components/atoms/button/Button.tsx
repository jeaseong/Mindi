import React from 'react';
import { Btn } from './Button.style';
import { BtnType } from 'components/types/atoms';

export default function Button({ text }: BtnType) {
  return <Btn>{text}</Btn>;
}
