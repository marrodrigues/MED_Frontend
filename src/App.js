import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './pages/home'
import LoginPage from './pages/login'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginPage} />
      </Router>
    );
  }
}

export default App;
