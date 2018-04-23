import { updateWallet, removeWallet } from 'utils'
import * as a from './actions'


const initialState = {
  walletsList: [],
  activeWallet: null,
}

export default (state = initialState, action) => {
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
      return state
  }
}
