import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Header from 'components/modules/header/Header';
import Main from 'components/modules/main/Main';
import SignIn from 'pages/User/SignIn';
import SignUp from 'pages/User/SignUp';
import Diary from 'pages/Diary/Diary';
import Posting from 'pages/Diary/Posting';
import ResultTemplate from 'components/templates/diary/result/ResultTemplate';
import EITest from 'pages/EITest/EITest';
import EITestResult from 'components/modules/EITest/EITestResult';
import { RouterPros } from 'types/router';

function RoutePage({ isLogin }: RouterPros) {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route
          path='/diary'
          element={<PrivateRoute user={isLogin} component={<Diary />} />}
        />
        <Route
          path='/diary-posting'
          element={<PrivateRoute user={isLogin} component={<Posting />} />}
        />
        <Route
          path='/diary-posting/result'
          element={
            <PrivateRoute user={isLogin} component={<ResultTemplate />} />
          }
        />
        <Route path='/ei-test' element={<EITest />} />
        <Route path='/ei-test/result' element={<EITestResult />} />
        <Route path='/' element={<Main />} />
      </Routes>
    </Router>
  );
}

export default RoutePage;
