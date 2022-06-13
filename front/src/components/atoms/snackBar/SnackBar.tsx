import React from 'react';
import { SnackBarProps } from 'components/types/atoms';
import { SnackBarContainer } from './SnackBar.style';
import { MdTaskAlt, MdInfoOutline } from 'react-icons/md';

function SnackBar({
  children,
  position = 'bottomRight',
  type,
  isActive = false,
}: SnackBarProps) {
  return (
    <SnackBarContainer isActive={isActive} type={type} position={position}>
      {type === 'sucessAlert' ? (
        <MdInfoOutline size='16' />
      ) : (
        <MdTaskAlt size='16' />
      )}
      {children}
    </SnackBarContainer>
  );
}

export default SnackBar;
