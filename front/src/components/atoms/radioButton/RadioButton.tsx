import React, { memo } from 'react';
import { RadioWrapper, Mark, Input, Label } from './RadioButton.style';

type RadioProps = {
  name: string;
  color: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioButton = ({ name, color, value, checked, onChange }: RadioProps) => (
  <RadioWrapper>
    <Label>
      <Input
        name={name}
        type='radio'
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <Mark color={color} />
    </Label>
  </RadioWrapper>
);

export default RadioButton;
