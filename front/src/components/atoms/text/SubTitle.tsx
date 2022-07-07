import React from 'react';
import { TextProps } from 'types/atoms';
import { Sub } from './SubTitle.style';

function SubTitle({ children, size, background, mb }: TextProps) {
  return (
    <Sub size={size} background={background} mb={mb}>
      {children}
    </Sub>
  );
}

export default React.memo(SubTitle);
