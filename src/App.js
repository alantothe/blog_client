import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import './App.css';

import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';


function App() {
  console.log("yo app")

  return (
<Router>
        <Routes>
          <Route exact path="/login" element={<LoginPage />}>

          </Route>
          <Route exact path="/register" element={<RegisterPage />}>

          </Route>
          <Route exact path="/dashboard" element={<Dashboard />}>

          </Route>
          <Route path="/" element={<Navigate to="dashboard" />} />
        </Routes>
      </Router>
  );
}

export default App;