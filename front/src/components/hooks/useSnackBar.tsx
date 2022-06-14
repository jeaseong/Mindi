import { useState, useEffect } from 'react';

export const useSnackBar = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [message, setMs] = useState('');
  useEffect(() => {
    if (isShowing) {
      setTimeout(() => {
        setIsShowing(false);
      }, 250);
    }
  }, [isShowing]);

  const openSnackBar = (msg: string) => {
    setIsShowing(true);
    setMs(msg);
  };

  return { message, isShowing, openSnackBar };
};
