import * as a from './actions'

const initialState = {
  isSignIn: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.LOGIN_SIGN_IN:
      return {
        ...state,
        isSignIn: action.isSignIn,
      }
    default:
      return state
  }
}
