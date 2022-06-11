import React from 'react';
import { Btn } from './Button.style';
import { BtnProps } from 'components/types/atoms';

function Button({ children, size, onClick }: BtnProps) {
  return (
    <Btn onClick={onClick} size={size}>
      {children}
    </Btn>
  );
}
export default Button;
