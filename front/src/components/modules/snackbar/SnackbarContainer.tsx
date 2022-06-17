import React from 'react';
import { useSnackbarContext } from 'components/contexts/SnackbarContext';
import SnackBar from 'components/atoms/snackBar/SnackBar';
function SnackbarContainer() {
  const { message, isShowing } = useSnackbarContext();
  return <SnackBar message={message} isActive={isShowing} />;
}

export default SnackbarContainer;
