import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from './reducers'
import {composeWithDevTools} from "redux-devtools-extension";
import { createLogger } from 'redux-logger';
import thunkMiddleware from "redux-thunk";

export * from './actions'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['activeWallet']
}

const loggerMiddleware = createLogger({
  level:      'info',
  collapsed:  true
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default (initialState = {}) => {
  let store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware, loggerMiddleware),
      )
  )
  
  let persistor = persistStore(store)
  return store
}
