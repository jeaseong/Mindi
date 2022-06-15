import React from 'react';
import './App.css';
import SignIn from 'pages/User/SignIn';
import SignUp from 'pages/User/SignUp';
import Posting from 'pages/Diary/Posting';
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
          <Route path='/diaty-posting' element={<Posting />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
