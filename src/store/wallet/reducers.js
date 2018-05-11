import { removeWallet } from 'src/utils'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import * as a from './actions'

const persistConfig = {
  key: 'wallet',
  storage: storage,
  blacklist: ['decryptedWallet'],
}

export const initialState = {
  walletsList: [],
  decryptedWallet: null,
  selectedWallet: null,
}

const wallet = (state = initialState, action) => {
  switch (action.type) {
    case a.WALLETS_ADD :
      return {
        ...state,
        walletsList: [
          ...state.walletsList,
          action.wallet,
        ],
      }

    case a.WALLETS_SELECT :
      return {
        ...state,
        selectedWallet: action.wallet,
      }

    case a.WALLETS_LOAD :
      return {
        ...state,
        decryptedWallet: action.wallet,
      }

    case a.WALLETS_UPDATE_LIST :
      return {
        ...state,
        walletsList: action.walletsList,
      }

    case a.WALLETS_REMOVE :
      return {
        ...state,
        walletsList: removeWallet(state.walletsList, action.name),
      }
    default:
      return {
        ...state,
      }
  }
}

export default persistReducer(persistConfig, wallet)
