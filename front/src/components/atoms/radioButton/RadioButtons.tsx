import React, { memo } from 'react';
import { RadioWrapper, Mark, Input, Label } from './RadioButtons.style';

type RadioProps = {
  children: React.ReactNode;
  name: string;
  color: string;
};

const RadioButtons = ({ name, children, color }: RadioProps) => (
  <RadioWrapper>
    <Label>
      <Input name={name} type='radio' />
      <Mark color={color} />
      {children}
    </Label>
  </RadioWrapper>
);

export default memo(RadioButtons);
