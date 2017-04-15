import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import { store } from './store'
import App from './components/App'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Debug from './components/Debug'
import MainLayout from './layout/Main'

import { UserIsAuthenticated } from './auth/wrappers.js'

const history = syncHistoryWithStore(browserHistory, store)

export const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path='/' component={UserIsAuthenticated(MainLayout)}>
            <IndexRoute component={Dashboard} />
            <Route path='dashboard' component={Dashboard} />
            <Route path='debug' component={Debug} />
        </Route>
        <Route path='/login' component={Login} />
      </Route>
    </Router>
  </Provider>
)
