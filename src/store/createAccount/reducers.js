import * as actions from './actions'

const initialState = {
  existingAccount: null,
  mnemonic: '',
  password: '',
  accountTypes: {},
  currentWallet: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
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

    case actions.SET_EXISTING_ACCOUNT: return ({
      ...state,
      existingAccount: action.existingAccount,
    })

    default:
      return state
  }
}
