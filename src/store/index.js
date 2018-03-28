import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk'
import { login } from './reducers'

export default (initialState = {}) => {
  const reducer = combineReducers({
    form: formReducer,
    login,
  })

  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
