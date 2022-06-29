import React from 'react';
import { Title, TitleBox } from './MainTitle.style';
import { TextProps } from 'types/atoms';

function MainTitle({ children, size }: TextProps) {
  return (
    <TitleBox>
      <Title size={size}>{children}</Title>
    </TitleBox>
  );
}

export default React.memo(MainTitle);
