import { useState, useEffect } from 'react';

export const useSnackBar = () => {
  const [isShowing, setIsShowing] = useState(false);
  useEffect(() => {
    if (isShowing) {
      setTimeout(() => {
        setIsShowing(false);
      }, 250);
    }
  }, [isShowing]);

  const openSnackBar = () => {
    setIsShowing(true);
  };

  return { isShowing, openSnackBar };
};
