import * as actions from './actions'
import * as loginActions from 'src/store/login/actions'
import type Account from "../../models/web3/Account";
import type AccountTypes from "../../models/user/AccountTypes";

interface STATE {
  existingAccount: Account;
  mnemonic: string;
  password: string;
  accountTypes: AccountTypes,
  currentWallet: Object;
}

const initialState = {
  existingAccount: null,
  mnemonic: '',
  password: '',
  accountTypes: {},
  currentWallet: null,
}

export default (state : STATE = initialState, action) => {
  switch (action.type) {

    case actions.EXISTING_ACCOUNT_CREATE: return ({
      ...state,
      existingAccount: action.payload,
    })

    case actions.CREATE_ACCOUNT_SET_MNEMONIC:
      return {
        ...state,
        mnemonic: action.mnemonic,
      }
    case actions.CREATE_ACCOUNT_SET_PASSWORD:
      return {
        ...state,
        password: action.password,
      }
    case actions.CREATE_ACCOUNT_SET_ACCOUNT_TYPES:
      return {
        ...state,
        accountTypes: action.types,
      }
    case actions.CREATE_ACCOUNT_SET_CURRENT_WALLET:
      return {
        ...state,
        currentWallet: action.encrypted,
      }
    case actions.CREATE_ACCOUNT_RESET_CURRENT_WALLET:
      return {
        ...state,
        currentWallet: null,
      }
    default:
      return state
  }
}
