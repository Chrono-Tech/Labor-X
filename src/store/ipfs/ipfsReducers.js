const initialState = {
  client: null,
}

const onSetupNode = (state, action) => {
  if (action.type === 'IPFS/SETUP_NODE') {
    return Object.assign({}, state, {
      client: action.client,
    })
  }
  return state
}

export const ipfsReducers = (state, action) => {
  state = state || initialState
  state = onSetupNode(state, action)
  return state
}
