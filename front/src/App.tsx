import React from 'react';
import RoutePage from 'routes/RoutePage';
import SnackbarContainer from 'components/modules/snackbar/SnackbarContainer';
import { useCurUser } from 'hooks/userQuery';

const App: React.FC = () => {
  const { isLogin, isFetching } = useCurUser();
  return (
    <div className='App'>
      <RoutePage isFetching={isFetching} isLogin={isLogin} />
      <SnackbarContainer />
    </div>
  );
};

export default App;
