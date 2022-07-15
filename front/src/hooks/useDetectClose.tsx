import { useEffect, useState } from 'react';

const useDetectClose = (elem: any, initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClick = (e: any) => {
      if (elem.current !== null && !elem.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isOpen, elem]);
  return [isOpen, onClick];
};

export default useDetectClose;
