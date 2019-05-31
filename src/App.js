import React, { Component } from 'react';
import './App.css';

import Home from './pages/home'
// import NewHome from './pages/new-home'
// import Login from './pages/login';
import Register from './pages/register'
import Admin from './pages/admin'
import Cliente from './pages/cliente'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path='/admin' component={Admin} />
        {/* <Route path="/home/" component={NewHome} /> */}
        {/* <Route path="/login/" component={Login} /> */}
        <Route path="/register/" component={Register} />
        <Route path='/cliente/' component={Cliente} />
      </Router>
    );
  }
}

export default App;
