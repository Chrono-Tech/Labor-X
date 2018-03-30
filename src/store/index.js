import { i18nReducer, syncTranslationWithStore } from 'react-redux-i18n'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk'
import { login } from './reducers'

export default (initialState = {}) => {
  const reducer = combineReducers({
    form: formReducer,
    i18n: i18nReducer,
    login,
  })

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
  syncTranslationWithStore(store)
  return store
}
