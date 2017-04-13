const initialState = {
  daemon: null,
  orbitdb: null,
  db: null
}

const onSetupNode = (state, action) => {
  if (action.type === 'IPFS/SETUP_NODE') {
    return Object.assign({}, state, {
      daemon: action.daemon,
      orbitdb: action.orbitdb,
      db: action.db
    })
  }
  return state
}

export const ipfsReducers = (state, action) => {
  state = state || initialState
  state = onSetupNode(state, action)
  return state
}
