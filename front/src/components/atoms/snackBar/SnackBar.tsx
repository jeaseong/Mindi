import React from 'react';
import { SnackBarProps } from 'types/atoms';
import { SnackBarContainer } from './SnackBar.style';
import { MdTaskAlt, MdInfoOutline } from 'react-icons/md';

function SnackBar({
  position = 'bottomRight',
  type,
  isActive = false,
  message,
}: SnackBarProps) {
  return (
    <SnackBarContainer isActive={isActive} type={type} position={position}>
      {type === 'sucessAlert' ? (
        <MdInfoOutline size='16' />
      ) : (
        <MdTaskAlt size='16' />
      )}
      {message}
    </SnackBarContainer>
  );
}

export default SnackBar;
