import Router from 'next/router'
import type SignInModel from 'models/SignInModel'

export const LOGIN_SIGN_IN = 'login/signIn'
export const LOGIN_SIGN_OUT = 'login/signOut'
export const LOGIN_CHANGE_STEP = 'login/changeStep'

// TODO @dkchv: !!! for tests, remove
export const signIn = (signInModel: SignInModel) => (dispatch) => {
  dispatch({ type: LOGIN_SIGN_IN, signInModel })
  Router.push('/test-sign-in')
}

export const signOut = () => (dispatch) => {
  dispatch({ type: LOGIN_SIGN_OUT })
}

export const signInWithWalletFile = () => (dispatch) => {

}

export const changeStep = (step) => (dispatch) => {
  dispatch({ type: LOGIN_CHANGE_STEP, step })
}
