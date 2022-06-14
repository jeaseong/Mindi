import React from 'react';
import './App.css';
import SignIn from 'pages/User/SignIn';
import SignUp from 'pages/User/SignUp';
import Header from 'components/modules/header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
