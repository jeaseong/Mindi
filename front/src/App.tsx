import React from 'react';
import './App.css';
import SignIn from 'pages/User/SignIn';
import SignUp from 'pages/User/SignUp';
import Header from 'components/modules/header/Header';
import EITest from 'pages/EITest/EITest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EITestResult from 'components/modules/EITest/EITestResult';
import Main1 from 'components/modules/main/Main1';
import Main2 from 'components/modules/main/Main2';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/ei-test' element={<EITest />} />
          <Route path='/ei-test/result' element={<EITestResult />} />
          <Route path='/main/1' element={<Main1 />} />
          <Route path='/main/2' element={<Main2 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
