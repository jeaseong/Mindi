import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Header from 'components/modules/header/Header';
import SignIn from 'pages/User/SignIn';
import SignUp from 'pages/User/SignUp';
import Diary from 'pages/Diary/Diary';
import Posting from 'pages/Diary/Posting';
import Edit from 'pages/Diary/Edit';
import ResultTemplate from 'components/templates/diary/result/ResultTemplate';
import EITest from 'pages/EITest/EITest';
import EITestResult from 'components/modules/EITest/EITestResult';
import Main1 from 'components/modules/main/Main1';
import Main2 from 'components/modules/main/Main2';
import { AnimatePresence } from 'framer-motion';
import { RouterPros } from 'types/router';

function RoutePage({ isLogin, isFetching }: RouterPros) {
  const location = useLocation();
  return (
    <>
      <Header />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route
            path='/diary'
            element={
              <PrivateRoute
                isLogin={isLogin}
                isFetching={isFetching}
                component={<Diary />}
              />
            }
          />
          <Route
            path='/diary-posting/:diaryDate'
            element={
              <PrivateRoute
                isLogin={isLogin}
                isFetching={isFetching}
                component={<Posting />}
              />
            }
          />
          <Route
            path='/diary-edit/:diaryDate'
            element={
              <PrivateRoute
                isLogin={isLogin}
                isFetching={isFetching}
                component={<Edit />}
              />
            }
          />
          <Route
            path='/result/:date'
            element={
              <PrivateRoute
                isLogin={isLogin}
                isFetching={isFetching}
                component={<ResultTemplate />}
              />
            }
          />
          <Route path='/ei-test' element={<EITest />} />
          <Route path='/ei-test/result' element={<EITestResult />} />
          <Route path='/main' element={<Main2 />} />
          <Route path='/' element={<Main1 />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default RoutePage;
