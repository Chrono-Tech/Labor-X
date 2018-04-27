import Router from 'next/router'
import type SignInModel from 'models/SignInModel'
import { createWallet, loadWallet } from 'src/store'

export const LoginSteps = {
  Ledger: 'ledger',
  Trezor: 'trezor',
  BrowserPlugIn: 'browserPlugIn',
  Mnemonic: 'mnemonic',
  PrivateKey: 'privateKey',
  WalletFile: 'walletFile',
  CreateWallet: 'createWallet',
  SelectLoginMethod: 'selectLoginMethod',
  Login: 'login',
}

export const LOGIN_SIGN_IN = 'login/signIn'
export const LOGIN_SET_SIGN_IN_MODEL = 'login/signInModel'
export const LOGIN_SIGN_OUT = 'login/signOut'
export const LOGIN_CHANGE_STEP = 'login/changeStep'
export const LOGIN_SELECT_WALLET = 'login/selectWallet'

export const setSignInModel = (signInModel) => (dispatch) => {
  dispatch({ type: LOGIN_SET_SIGN_IN_MODEL, signInModel })
}

export const signIn = (password) => (dispatch, getState) => {
  const state = getState()
  const { selectedWallet } = state.login

  dispatch(loadWallet(selectedWallet.encrypted, password))

  dispatch({ type: LOGIN_SIGN_IN })

  Router.push('/test-sign-in')
}

export const signOut = () => (dispatch) => {
  dispatch({ type: LOGIN_SIGN_OUT })
}

export const createAccount = (walletName, password) => (dispatch, getState) => {
  const state = getState()
  const signInModel = state.login.signIn

  dispatch(createWallet({ [signInModel.method] : signInModel.key,  name: walletName, password: password }))

  Router.push('/test-sign-in')
}

export const onSubmitMnemonic = (signInModel) => (dispatch) => {
  dispatch(setSignInModel(signInModel))
  dispatch(changeStep(LoginSteps.CreateWallet))

}

export const onSubmitPrivateKey = (signInModel) => (dispatch) => {
  dispatch(setSignInModel(signInModel))
  dispatch(changeStep(LoginSteps.CreateWallet))

}

export const onSelectWallet = (wallet) => (dispatch) => {
  dispatch({ type: LOGIN_SELECT_WALLET, wallet })
  dispatch(changeStep(LoginSteps.Login))

}

export const navigateToCreateWallet = () => (dispatch) => {
  dispatch(changeStep(LoginSteps.CreateWallet))
}

export const changeStep = (step) => (dispatch) => {
  dispatch({ type: LOGIN_CHANGE_STEP, step })
}
