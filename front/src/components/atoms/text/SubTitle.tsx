import React from 'react';
import { TextProps } from 'types/atoms';
import { Sub } from './SubTitle.style';

function SubTitle({ children, size, background }: TextProps) {
  return (
    <Sub size={size} background={background}>
      {children}
    </Sub>
  );
}

export default React.memo(SubTitle);
