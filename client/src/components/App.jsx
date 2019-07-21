import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Mnemosyne from './Mnemosyne';
import '../styles/app.scss';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Mnemosyne} />
    </Router>
  )
}

export default App;
