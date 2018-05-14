import { i18nReducer, syncTranslationWithStore } from 'react-redux-i18n'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import { createLogger } from 'redux-logger'
import * as thunkMiddleware from 'redux-thunk'
import web3Factory from 'src/web3'
import { login, landing, wallet, createAccount } from './reducers'

export * from './landing/actions'
export * from './login/actions'
export * from './wallet/actions'
export * from './wallet/selectors'
export * from './createAccount/actions'

const loggerMiddleware = createLogger({
  level:      'info',
  collapsed:  true,
  serialize: true,
})

export default (initialState = {}) => {

  const web3 = web3Factory()

  const reducer = combineReducers({
    form: formReducer,
    i18n: i18nReducer,
    login,
    landing,
    wallet: wallet({ web3 }),
    createAccount,
  })

  // eslint-disable-next-line
  console.log('global initialState', initialState)

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

  // eslint-disable-next-line
  store.__persistor = persistStore(store)

  syncTranslationWithStore(store)

  return store
}
