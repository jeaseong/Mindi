import React from 'react';
import { Btn } from './Button.style';
import { BtnProps } from 'components/types/atoms';

function Button({ children, size, type, onClick }: BtnProps) {
  return (
    <Btn type={type} onClick={onClick} size={size}>
      {children}
    </Btn>
  );
}
export default Button;
