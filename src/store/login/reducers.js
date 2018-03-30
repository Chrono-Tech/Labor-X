import SignInModel from '../../models/SignInModel'
import * as a from './actions'

const initialState = {
  isSignIn: false,
  signIn: new SignInModel(),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.LOGIN_SIGN_IN:
      return {
        ...state,
        isSignIn: true,
        signIn: action.signInModel,
      }
    case a.LOGIN_SIGN_OUT:
      return {
        ...state,
        isSignIn: false,
        signIn: new SignInModel(),
      }
    default:
      return state
  }
}
