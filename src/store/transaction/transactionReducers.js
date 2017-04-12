const initialState = {
  tx: null,
}

const onPublished = (state, action) => {
  if (action.type === 'TX/PUBLISHED') {
    return {
      ...state,
      tx: action.tx
    }
  }
  return state
}

const onMined = (state, action) => {
  if (action.type === 'TX/MINED') {
    return {
      ...state,
      tx: null
    }
  }
  return state
}

export const transactionReducers = (state, action) => {
  state = state || initialState
  state = onPublished(state, action);
  state = onMined(state, action);
  return state
}
