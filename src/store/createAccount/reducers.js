import * as actions from './actions'

const initialState = {
  mnemonic: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_ACCOUNT_SET_MNEMONIC:
      return {
        ...state,
        mnemonic: action.mnemonic,
      }
    default:
      return state
  }
}
