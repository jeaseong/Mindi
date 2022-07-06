import React from 'react';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import SnackBar from 'components/atoms/snackBar/SnackBar';

interface PositionType {
  position?: 'topRight' | 'bottomRight' | 'center';
}
function SnackbarContainer({ position }: PositionType) {
  const { message, isShowing, type } = useSnackbarContext();
  return (
    <SnackBar
      position={position}
      message={message}
      isActive={isShowing}
      type={type}
    />
  );
}

export default SnackbarContainer;
