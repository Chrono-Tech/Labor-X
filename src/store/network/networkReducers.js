const initialState = {
  web3: null,
  accounts: []
}

const onSetupWeb3 = (state, action) => {
  if (action.type === 'NETWORK/SETUP_WEB3') {
    return {
      ...state,
      web3: action.web3
    }
  }
  return state
}

const onSetAccounts = (state, action) => {
  if (action.type === 'NETWORK/SET_ACCOUNTS') {
    return {
      ...state,
      accounts: action.accounts
    }
  }
  return state
}

export const networkReducers = (state, action) => {
  state = state || initialState
  state = onSetupWeb3(state, action)
  state = onSetAccounts(state, action)
  return state
}
