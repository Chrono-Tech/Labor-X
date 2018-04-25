import { i18nReducer, syncTranslationWithStore } from 'react-redux-i18n'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { login, landing } from './reducers'

export * from './landing/actions'
export * from './login/actions'

const loggerMiddleware = createLogger({
  level:      'info',
  collapsed:  true
});


export default (initialState = {}) => {
  const reducer = combineReducers({
    form: formReducer,
    i18n: i18nReducer,
    login,
    landing,
  })

  const store = createStore(
    reducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunkMiddleware, process.env.NODE_ENV !== 'production' ? loggerMiddleware: undefined))
  )
  syncTranslationWithStore(store)
  return store
}
