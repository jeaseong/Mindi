import React, { memo } from 'react';
import { RadioWrapper, Mark, Input, Label } from './RadioButton.style';
import { RadioProps } from 'components/types/atoms';

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
