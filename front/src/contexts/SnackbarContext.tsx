import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useContext,
} from 'react';
import { Snackbar, SnackbarType } from 'types/atoms';

export const SnackbarContext = createContext<Snackbar | null>(null);

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [message, setMs] = useState('');
  const [type, setType] = useState<SnackbarType>('sucessAlert');
  useEffect(() => {
    if (isShowing) {
      setTimeout(() => {
        setIsShowing(false);
      }, 3000);
    }
  }, [isShowing]);

  const openSnackBar = (sucessAlert: boolean, msg: string) => {
    setIsShowing(true);
    setMs(msg);
    setType(sucessAlert ? 'sucessAlert' : 'errorAlert');
  };
  const store: Snackbar = useMemo(
    () => ({
      message,
      isShowing,
      openSnackBar,
      type,
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
  // null check를 하지 않으면 type이 Snackbar | null이 되기 때문임.
  if (!store) throw new Error('Cannot find SnackbarProvider');
  return store;
};
