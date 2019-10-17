import React, { useState } from 'react';

import Home from './pages/home'
// import NewHome from './pages/new-home'
// import Login from './pages/login';
import Register from './pages/register'
import Admin from './pages/admin'
import Cliente from './pages/cliente'
import Forms from './pages/forms'
import ComingSoon from './pages/coming-soon'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => (
  <Router>
    <Route exact path="/" component={Home} />
    <Route path='/admin' component={Admin} />
    {/* <Route path="/home/" component={NewHome} /> */}
    {/* <Route path="/login/" component={Login} /> */}
    <Route path="/register/" component={Register} />
    <Route path='/cliente/' component={Cliente} />
    <Route path='/forms/' component={Forms} />
    <Route path='/coming-soon/' component={ComingSoon} />
  </Router>
);


export default App;
