import React from 'react';
import './App.css';
import SignIn from 'pages/User/SignIn';
import SignUp from 'pages/User/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestPage from 'pages/Test/TestPage';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
