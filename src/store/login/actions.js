import Router from 'next/router'
import type SignInModel from 'models/SignInModel'
import { createWallet } from 'src/store'

export const LOGIN_SIGN_IN = 'login/signIn'
export const LOGIN_SIGN_OUT = 'login/signOut'
export const LOGIN_CHANGE_STEP = 'login/changeStep'

// TODO @dkchv: !!! for tests, remove
export const signIn = (signInModel: SignInModel) => (dispatch) => {
  dispatch({ type: LOGIN_SIGN_IN, signInModel })
  dispatch(createWallet({ privateKey: signInModel.value, name: 'default', password: '123', numberOfAccounts: 0}))
  Router.push('/test-sign-in')
}

export const submitMnemonic = (mnemonic) => (dispatch) => {

  // HARDCODE: Should be remove after add create account page
  dispatch(createWallet({ mnemonic: mnemonic, name: 'default', password: '123' }))
  Router.push('/test-sign-in')
}

export const submitPrivateKey = (privateKey) => (dispatch) => {

  // HARDCODE: Should be remove after add create account page
  dispatch(createWallet({ privateKey: privateKey, name: 'default', password: '123' }))

  Router.push('/test-sign-in')
}

export const signOut = () => (dispatch) => {
  dispatch({ type: LOGIN_SIGN_OUT })
}

export const changeStep = (step) => (dispatch) => {
  dispatch({ type: LOGIN_CHANGE_STEP, step })
}
