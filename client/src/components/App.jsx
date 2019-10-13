import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Mnemosyne from './Mnemosyne';
import Login from './Login';
import '../styles/app.scss';

function App() {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
  });

  return (
    <Router>
      <Route path="/" exact component={Mnemosyne} />
      <Route path="/login" exact component={Login} />
    </Router>
  )
}

export default App;
