import { i18nReducer, syncTranslationWithStore } from 'react-redux-i18n'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import { createLogger } from 'redux-logger'
import * as thunkMiddleware from 'redux-thunk'
import web3Factory from 'src/web3'
import { initDAOs } from './daos/actions'
import { initBoards } from './boards/actions'
import { signerSelector } from './wallet/selectors'
import { initTokens } from './tokens/actions'

import { login, landing, ethereum, daos, tokens, wallet, createAccount, boards } from './reducers'

export * from './actions'

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
    tokens,
    boards,
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
    store.dispatch(initDAOs({ web3 })).then(
      () => {
        store.dispatch(initTokens({ web3 }))

        let previousAddress = null
        store.subscribe(() => {
          const currentSigner = signerSelector()(store.getState())
          const currentAddress = currentSigner != null // nil check
            ? currentSigner.address
            : null
          if (currentAddress !== previousAddress) {
            // eslint-disable-next-line
            console.log('Signer changed to ', currentAddress)
            previousAddress = currentAddress
            store.dispatch(initBoards())
          }
        })

        // eslint-disable-next-line
        store.__persistor = persistStore(store)
      }
    )
  }

  return store
}
