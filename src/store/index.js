import { i18nReducer, syncTranslationWithStore } from 'react-redux-i18n'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import { createLogger } from 'redux-logger'
import * as thunkMiddleware from 'redux-thunk'
import web3Factory from 'src/web3'
import { initEthereum } from './ethereum/actions'
import { initDAOs } from './daos/actions'

import { login, landing, ethereum, daos, wallet, createAccount } from './reducers'

export * from './landing/actions'
export * from './login/actions'
export * from './ethereum/actions'
export * from './daos/actions'
export * from './daos/selectors'
export * from './wallet/actions'
export * from './wallet/selectors'
export * from './createAccount/actions'

const loggerMiddleware = createLogger({
  level:      'info',
  collapsed:  true,
  serialize: true,
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
    wallet: wallet({ web3 }),
    createAccount,
  })

  // Here you can recover state sent from the backend
  const extra = {
    i18n: initialState.i18n,
  }

  const store = createStore(
    reducer,
    extra,
    composeWithDevTools(
      process.env.NODE_ENV !== 'production'
        ? applyMiddleware(thunkMiddleware.default, loggerMiddleware)
        : applyMiddleware(thunkMiddleware.default)
    )
  )

  syncTranslationWithStore(store)

  if (typeof window !== 'undefined') {

    // const web3 = web3Factory()
    // store.dispatch(initEthereum({ web3 }))
    store.dispatch(initDAOs({ web3 }))

    // eslint-disable-next-line
    store.__persistor = persistStore(store)
  }

  return store
}
