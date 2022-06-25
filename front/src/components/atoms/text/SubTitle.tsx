import React from 'react';
import { TextProps } from 'types/atoms';
import { Sub } from './SubTitle.style';

function SubTitle({ children }: TextProps) {
  return <Sub>{children}</Sub>;
}

export default React.memo(SubTitle);
