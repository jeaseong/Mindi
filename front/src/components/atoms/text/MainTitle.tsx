import React from 'react';
import { Title, TitleBox } from './MainTitle.style';
import { TextProps } from 'types/atoms';

function MainTitle({ children }: TextProps) {
  return (
    <TitleBox>
      <Title>{children}</Title>
    </TitleBox>
  );
}

export default React.memo(MainTitle);
