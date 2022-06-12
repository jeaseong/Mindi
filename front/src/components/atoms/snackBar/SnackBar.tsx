import React from 'react';
import { SnackBarProps } from 'components/types/atoms';
import { SnackBarContainer } from './SnackBar.style';
function SnackBar({ children, position = 'bottomRight', type }: SnackBarProps) {
  return (
    <SnackBarContainer type={type} position={position}>
      {children}
    </SnackBarContainer>
  );
}

export default SnackBar;
