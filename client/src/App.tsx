import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import LoginForm from './components/LoginForm'; 

import './App.css'; 

function App() {
  return (
    <Router>
    <>
      <LoginForm />
      
    </>
    </Router>
  );
}

export default App;
