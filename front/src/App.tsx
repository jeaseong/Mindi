import React from 'react';
import './App.css';
import SignIn from 'pages/User/SignIn';
import SignUp from 'pages/User/SignUp';
import Header from 'components/modules/header/Header';
import EITestPage from 'pages/EITest/EITestPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/ei-test' element={<EITestPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
