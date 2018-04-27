import SignInModel from '../../models/SignInModel'
import * as a from './actions'
import {LOGIN_RESET_LOGIN_OPTIONS} from "./actions";
import {LOGIN_RESET_LOGIN_OPTIONS_METHOD} from "./actions";

const initialState = {
  isSignIn: false,
  signIn: new SignInModel(),
  step: null,
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
    case a.LOGIN_CHANGE_STEP:
      return {
        ...state,
        step: action.step,
      }
    default:
      return state
  }
}
