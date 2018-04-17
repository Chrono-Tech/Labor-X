import { i18nReducer, syncTranslationWithStore } from 'react-redux-i18n'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk'
import { login, landing } from './reducers'

export * from './landing/actions'
export * from './login/actions'

export default (initialState = {}) => {
  const reducer = combineReducers({
    form: formReducer,
    i18n: i18nReducer,
    login,
    landing,
  })

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
  syncTranslationWithStore(store)
  return store
}
