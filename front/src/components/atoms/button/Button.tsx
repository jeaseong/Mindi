import React from 'react';
import { Btn } from './Button.style';
import { BtnProps } from 'components/types/atoms';

function Button({ children, size, type, disabled = false, onClick }: BtnProps) {
  return (
    <Btn disabled={disabled} type={type} onClick={onClick} size={size}>
      {children}
    </Btn>
  );
}
export default React.memo(Button);
