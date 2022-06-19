import React from 'react';
import './App.css';
import SignIn from 'pages/User/SignIn';
import SignUp from 'pages/User/SignUp';
import Posting from 'pages/Diary/Posting';
import Header from 'components/modules/header/Header';
import EITest from 'pages/EITest/EITest';
import Diary from 'pages/Diary/Diary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EITestResult from 'components/modules/EITest/EITestResult';
import Main from 'components/modules/main/Main';
import SnackbarContainer from 'components/modules/snackbar/SnackbarContainer';
import ResultTemplate from 'components/templates/diary/ResultTemplate';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/diary' element={<Diary />} />
          <Route path='/diary-posting' element={<Posting />} />
          <Route path='/diary-posting/result' element={<ResultTemplate />} />
          <Route path='/ei-test' element={<EITest />} />
          <Route path='/ei-test/result' element={<EITestResult />} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </Router>
      <SnackbarContainer />
    </div>
  );
};

export default App;
