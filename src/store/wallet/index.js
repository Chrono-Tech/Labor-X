import { createStore, applyMiddleware, } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {composeWithDevTools} from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'
export * from './actions'

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['activeWallet']
}


const loggerMiddleware = createLogger({
  level:      'info',
  collapsed:  true
});

const middlewares = [thunkMiddleware, process.env.NODE_ENV !== 'production' ? loggerMiddleware: undefined]

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(
    persistedReducer,
    undefined,
    composeWithDevTools(
      applyMiddleware(...middlewares),
      )
  )
  
  let persistor = persistStore(store)
  
  return store
}
