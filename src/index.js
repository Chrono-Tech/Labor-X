import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'

import LandingPage from "./../pages/landing-page";
import LoginPage from "./../pages/login";
import CreateAccountPage from "./../pages/create-account";
import DashboardPage from "./../pages/dashboard";

import {createLogger} from "redux-logger";
import web3Factory from "src/web3";
import {
  balances,
  boards,
  createAccount,
  daos,
  ethereum,
  generalProfile,
  jobs,
  landing,
  login,
  modals,
  myWallet,
  offers,
  tokens,
  user,
  wallet,
  workerProfile
} from "src/store/reducers";
import {reducer as formReducer} from "redux-form";
import {i18nReducer, syncTranslationWithStore} from "react-redux-i18n";
import {initFrontend} from "src/store/bootstrap";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ModalStack } from 'src/partials'
import 'styles/globals/globals.scss'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import MomentUtils from 'material-ui-pickers/utils/moment-utils';


const history = createBrowserHistory()

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed:  true,
  serialize: true,
  predicate: () => typeof window !== 'undefined',
})

const web3 = typeof window !== 'undefined'
  ? web3Factory()
  : null

const reducer = combineReducers({
  form: formReducer,
  i18n: i18nReducer,
  login,
  landing,
  ethereum: ethereum({ web3 }),
  daos,
  tokens,
  boards,
  jobs,
  wallet: wallet({ web3 }),
  balances,
  createAccount,
  modals,
  user: user(),
  offers,
  generalProfile,
  workerProfile,
  myWallet,
})

const extra = {
  i18n: {},
}

const store = createStore(
  connectRouter(history)(reducer),
  extra,
  compose(
      applyMiddleware(
          routerMiddleware(history),
          thunk,
          loggerMiddleware,
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

syncTranslationWithStore(store)

const persistor = persistStore(store, null, () => {
  store.dispatch(initFrontend(store)({ web3 }))
})

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading='Loading' persistor={persistor}>
          <MuiThemeProvider>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <div>
                <ConnectedRouter history={history}>
                  <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/create-account" component={CreateAccountPage}/>
                    <Route exact path="/dashboard" component={DashboardPage}/>
                  </Switch>
                </ConnectedRouter>
                <ModalStack />
              </div>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
