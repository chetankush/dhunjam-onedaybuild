// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/dashboard/:userId" element={<Dashboard />} /> 
          
        
        <Route path="/" element={<LoginPage />} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default App;
