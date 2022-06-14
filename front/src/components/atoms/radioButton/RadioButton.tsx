import React, { memo } from 'react';
import { RadioWrapper, Mark, Input, Label } from './RadioButton.style';

type RadioProps = {
  children: React.ReactNode;
  name: string;
  color: string;
  value: any;
  checked: any;
  onChange: any;
};

const RadioButton = ({ name, children, color, value, checked, onChange }: RadioProps) => (
  <RadioWrapper>
    <Label>
      <Input name={name} type='radio' value={value} checked={checked} onChange={onChange} />
      <Mark color={color} />
      {children}
    </Label>
  </RadioWrapper>
);

export default RadioButton;
