import { updateWallet, removeWallet } from 'src/utils'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import * as a from './actions'

const persistConfig = {
  key: 'wallet',
  storage: storage,
  blacklist: ['activeWallet']
}

export const initialState = {
  walletsList: [],
  activeWallet: null,
}

const wallet = (state = initialState, action) => {
  switch (action.type) {
    case a.WALLETS_CREATE :
      return {
        ...state,
        walletsList: [
          ...state.walletsList,
          action.wallet
        ]
      }
      
    case a.WALLETS_SELECT :
      return {
        ...state,
        activeWallet: action.wallet
      }
      
    case a.WALLETS_UPDATE :
      return {
        ...state,
        activeWallet: updateWallet(action.wallet, action.name)
      }
      
    case a.WALLETS_REMOVE :
      return {
        ...state,
        walletsList: removeWallet(state.walletsList, action.name)
      }
    default:
      return {...state}
  }
}

export default persistReducer(persistConfig, wallet)
