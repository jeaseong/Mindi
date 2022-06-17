import React from 'react';
import { useSnackbarContext } from 'components/contexts/SnackbarContext';
import SnackBar from 'components/atoms/snackBar/SnackBar';
function SnackbarContainer() {
  const { message, isShowing, type } = useSnackbarContext();
  return <SnackBar message={message} isActive={isShowing} type={type} />;
}

export default SnackbarContainer;
