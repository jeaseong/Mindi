import React from 'react';
import RoutePage from 'routes/RoutePage';
import SnackbarContainer from 'components/modules/snackbar/SnackbarContainer';
import { useCurUser } from 'hooks/userQuery';

const App: React.FC = () => {
  const { isLogin, isLoading } = useCurUser();
  return (
    <div className='App'>
      <RoutePage isFetching={isLoading} isLogin={isLogin} />
      <SnackbarContainer position='center' />
    </div>
  );
};

export default App;
