import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Header from 'components/modules/header/Header';
import SignIn from 'pages/User/SignIn';
import SignUp from 'pages/User/SignUp';
import Password from 'pages/User/Password';
import Mypage from 'pages/User/Mypage';
import Diary from 'pages/Diary/Diary';
import Posting from 'pages/Diary/Posting';
import Edit from 'pages/Diary/Edit';
import ResultTemplate from 'components/templates/diary/result/ResultTemplate';
import Static from 'pages/Static/Static';
import EITest from 'pages/EITest/EITest';
import EITestResult from 'components/modules/EITest/EITestResult';
import Main1 from 'components/modules/main/Main1';
import Main2 from 'components/modules/main/Main2';
import Bamboo from 'pages/Bamboo/Bamboo';
import BambooPosting from 'components/modules/bamboo/posting/bambooPosting';
import { AnimatePresence } from 'framer-motion';
import { RouterPros } from 'types/router';

function RoutePage({ isLogin, isFetching }: RouterPros) {
  const location = useLocation();
  return (
    <>
      <Header isLogin={isLogin} />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/password-reset' element={<Password />} />
          <Route
            path='/mypage'
            element={
              <PrivateRoute
                isLogin={isLogin}
                isFetching={isFetching}
                component={<Mypage />}
              />
            }
          />
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
          <Route
            path='/static'
            element={
              <PrivateRoute
                isLogin={isLogin}
                isFetching={isFetching}
                component={<Static />}
              />
            }
          />
          <Route
            path='/bamboo-grove'
            element={
              <PrivateRoute
                isLogin={isLogin}
                isFetching={isFetching}
                component={<Bamboo />}
              />
            }
          />
          <Route path='/ei-test' element={<EITest />} />
          <Route path='/ei-test/result' element={<EITestResult />} />
          <Route path='/main' element={<Main2 />} />
          <Route path='/' element={<Main1 />} />
          <Route path='/bamboo-grove/posting' element={<BambooPosting />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default RoutePage;
