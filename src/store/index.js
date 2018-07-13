import { i18nReducer, syncTranslationWithStore } from 'react-redux-i18n'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import { createLogger } from 'redux-logger'
import * as thunkMiddleware from 'redux-thunk'
import web3Factory from 'src/web3'
import { initFrontend, initBackend } from './bootstrap'
import { login, landing, ethereum, daos, tokens, wallet, balances, createAccount, boards, jobs, modals, user, offers, generalProfile, dashboard, myWallet } from './reducers'

export * from './actions'

const loggerMiddleware = createLogger({
  level:      'info',
  collapsed:  true,
  serialize: true,
  predicate: () => typeof window !== 'undefined',
})

const web3 = typeof window !== 'undefined'
  ? web3Factory()
  : null

export default (initialState = {}) => {

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
    dashboard,
    myWallet,
  })

  // Here you can recover state sent from the backend
  const extra = {
    i18n: initialState.i18n,
  }

  const store = createStore(
    reducer,
    extra,
    composeWithDevTools(
      // process.env.NODE_ENV !== 'production'
      true
        ? applyMiddleware(thunkMiddleware.default, loggerMiddleware)
        : applyMiddleware(thunkMiddleware.default)
    )
  )

  syncTranslationWithStore(store)

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line
    store.__persistor = persistStore(store)
    store.dispatch(initFrontend(store)({ web3 }))
  } else {
    store.dispatch(initBackend())
  }

  return store
}
