import React, { Component } from 'react';
import './App.css';

import Home from './pages/home'
import NewHome from './pages/new-home'
import Login from './pages/login';
import Register from './pages/register'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/home/" component={NewHome} />
        <Route path="/login/" component={Login} />
        <Route path="/register/" component={Register} />
      </Router>
    );
  }
}

export default App;
