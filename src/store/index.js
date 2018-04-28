import { i18nReducer, syncTranslationWithStore } from 'react-redux-i18n'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import { createLogger } from 'redux-logger'
import * as thunkMiddleware from 'redux-thunk'
import { login, landing, wallet } from './reducers'

export * from './landing/actions'
export * from './login/actions'
export * from './wallet/actions'

const loggerMiddleware = createLogger({
  level:      'info',
  collapsed:  true,
  serialize: true,
})

export default () => {
  const reducer = combineReducers({
    form: formReducer,
    i18n: i18nReducer,
    login,
    landing,
    wallet,
  })

  const store = createStore(
    reducer,
    undefined,
    composeWithDevTools(
      process.env.NODE_ENV !== 'production'
        ? applyMiddleware(thunkMiddleware.default, loggerMiddleware)
        : applyMiddleware(thunkMiddleware.default)
    )
  )

  store.__persistor = persistStore(store)

  syncTranslationWithStore(store)

  return store
}
