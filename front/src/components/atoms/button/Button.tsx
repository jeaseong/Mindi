import React from 'react';
import { Btn } from './Button.style';
import { BtnProps } from 'components/types/button';

export default function Button({ children, style }: BtnProps) {
  return <Btn style={style}>{children}</Btn>;
}
