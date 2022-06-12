import React, { useState, useRef, useEffect } from 'react';

export const useSnackBar = () => {
  const [isShowing, setIsShowing] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setIsShowing((cur) => false);
    }, 2600);
  }, [isShowing]);

  return { setIsShowing };
};
