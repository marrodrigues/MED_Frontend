import React, { Component } from 'react';
import './App.css';

import Home from './pages/home'
import NewHome from './pages/new-home'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/home/" component={NewHome} />
      </Router>
    );
  }
}

export default App;
