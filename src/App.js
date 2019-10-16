import React from 'react';

import createHistory from 'history/createBrowserHistory'
import Root from './Root'
import initialState from './initialState'
import createReducer from './reducers'
import GlobalStyle from './GlobalStyle'

import HomePage from './pages/home'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

const history = createHistory()

const App = () => (
  <Root initialState={initialState} reducers={createReducer()}>
    <GlobalStyle />
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router>
  </Root>
);


export default App;