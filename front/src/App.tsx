import React from 'react';
import RoutePage from 'routes/RoutePage';
import SnackbarContainer from 'components/modules/snackbar/SnackbarContainer';
import { useCurUser } from 'hooks/userQuery';

const App: React.FC = () => {
  const { data } = useCurUser();
  const isLogin = !!data?.isLogin;
  return (
    <div className='App'>
      <RoutePage isLogin={isLogin} />
      <SnackbarContainer />
    </div>
  );
};

export default App;
