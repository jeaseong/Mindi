import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useContext,
} from 'react';
import { Snackbar } from 'components/types/atoms';

export const SnackbarContext = createContext<Snackbar | null>(null);

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [message, setMs] = useState('');
  useEffect(() => {
    if (isShowing) {
      setTimeout(() => {
        setIsShowing(false);
      }, 3000);
    }
  }, [isShowing]);

  const openSnackBar = (msg: string) => {
    setIsShowing(true);
    setMs(msg);
  };
  const store: Snackbar = useMemo(
    () => ({
      message,
      isShowing,
      openSnackBar,
    }),
    [message, isShowing],
  );
  return (
    <SnackbarContext.Provider value={store}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => {
  const store = useContext(SnackbarContext);
  if (!store) throw new Error('Cannot find SnackbarProvider');
  return store;
};
