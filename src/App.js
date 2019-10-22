import React from 'react';

import { createBrowserHistory as createHistory } from 'history'
import Root from './Root'
import initialState from './initialState'
import createReducer from './reducers'
import GlobalStyle from './GlobalStyle'

import AdminPage from './pages/admin'
import HomePage from './pages/home'
import ComingSoon from './pages/coming-soon';
import RegisterPage  from './pages/register'

import { Router, Route, Switch } from 'react-router-dom'

const history = createHistory()

const App = () => (
  <Root initialState={initialState} reducers={createReducer()}>
    <GlobalStyle />
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={ComingSoon} />
      </Switch>
    </Router>
  </Root>
);


export default App;