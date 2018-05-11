import Router from 'next/router'
import type SignInModel from 'models/SignInModel'
import WalletEntryModel from 'models/WalletEntryModel'
import { createWallet, decryptWallet, walletSelect, walletAdd, validateMnemonicForWallet, resetPasswordWallet, generateNameWallet } from 'src/store'
import { getWalletAddress } from 'src/utils'

export const LoginSteps = {
  Ledger: 'ledger',
  Trezor: 'trezor',
  BrowserPlugIn: 'browserPlugIn',
  Mnemonic: 'mnemonic',
  Uport: 'uport',
  PrivateKey: 'privateKey',
  WalletFile: 'walletFile',
  CreateWallet: 'createWallet',
  SelectLoginMethod: 'selectLoginMethod',
  SelectWallet: 'selectWallet',
  Login: 'login',
  RecoveryPassword: 'recoveryPassword',
  RecoveryPasswordReset: 'recoveryPasswordReset',
  BackupWallet: 'backupWallet',
}

export const LOGIN_SIGN_IN = 'login/signIn'
export const LOGIN_SET_SIGN_IN_MODEL = 'login/signInModel'
export const LOGIN_SIGN_OUT = 'login/signOut'
export const LOGIN_CHANGE_STEP = 'login/changeStep'
export const LOGIN_SELECT_WALLET_RECOVERY_FORM = 'login/selectWalletRecoveryForm'
export const LOGIN_SET_RECOVERY_PASSWORD_MODE = 'login/setRecoveryPasswordMode'
export const LOGIN_RESET_RECOVERY_PASSWORD_MODE = 'login/resetRecoveryPasswordMode'
export const LOGIN_SET_RECOVERY_FORM_MNEMONIC = 'login/setRecoveryFormMnemonic'
export const LOGIN_RESET_RECOVERY_FORM_MNEMONIC = 'login/resetRecoveryFormMnemonic'

export const setSignInModel = (signInModel) => (dispatch) => {
  dispatch({ type: LOGIN_SET_SIGN_IN_MODEL, signInModel })
}

export const signIn = ({password}) => (dispatch, getState) => {
  const state = getState()
  const { selectedWallet } = state.wallet
  
  dispatch(decryptWallet(new WalletEntryModel(selectedWallet), password))

  dispatch({ type: LOGIN_SIGN_IN })

  Router.push('/dashboard')
}

export const signOut = () => (dispatch) => {
  dispatch({ type: LOGIN_SIGN_OUT })
}

export const createAccount = (walletName, password) => (dispatch, getState) => {
  const state = getState()
  const signInModel = state.login.signIn

  if (signInModel) {
    const wallet = dispatch(createWallet({ [signInModel.method] : signInModel.key,  name: walletName, password: password }))
    
    dispatch(walletAdd(wallet))
    
    dispatch(walletSelect(wallet))
    
    dispatch(navigateToBackupWallet())

    
  } else {
    Router.push('/account-password')
  }
}

export const onSubmitMnemonic = (signInModel) => (dispatch) => {
  dispatch(setSignInModel(signInModel))
  dispatch(navigateToCreateWallet())

}

export const onSubmitPrivateKey = (signInModel) => (dispatch) => {
  dispatch(setSignInModel(signInModel))
  dispatch(navigateToCreateWallet())

}

export const selectWalletRecoveryForm = (wallet) => (dispatch) => {
  dispatch({ type: LOGIN_SELECT_WALLET_RECOVERY_FORM, wallet })
}

export const onSelectWallet = (wallet) => (dispatch, getState) => {
  const state = getState()
  
  const {isRecoveryPasswordMode} = state.login
  
  if (isRecoveryPasswordMode){
    
    dispatch(selectWalletRecoveryForm(wallet))
    
    dispatch(changeStep(LoginSteps.RecoveryPassword))
  
  
  } else {
    
    dispatch(walletSelect(wallet))
    
    dispatch(changeStep(LoginSteps.Login))
  }
  

}

export const navigateToCreateWallet = () => (dispatch) => {
  dispatch(changeStep(LoginSteps.CreateWallet))
}

export const navigateToSelectWallet = () => (dispatch) => {
  dispatch(changeStep(LoginSteps.SelectWallet))
}

export const navigateToSelectLoginMethod = () => (dispatch) => {
  dispatch(changeStep(LoginSteps.SelectLoginMethod))
}

export const navigateToBackupWallet = () => (dispatch) => {
  dispatch(changeStep(LoginSteps.BackupWallet))
}

export const navigateToRecoveryPassword = () => (dispatch, getState) => {
  const state = getState()
  
  const { selectedWallet } = state.wallet
  
  dispatch(selectWalletRecoveryForm(selectedWallet))
  dispatch({ type: LOGIN_SET_RECOVERY_PASSWORD_MODE })
  dispatch(changeStep(LoginSteps.RecoveryPassword))
}

export const onSubmitRecoveryAccountForm = ({mnemonic}) => (dispatch) => {
  dispatch(setRecoveryFormMnemonic(mnemonic))
  dispatch(changeStep(LoginSteps.RecoveryPasswordReset))
}

export const onConfirmRecoveryPassword = ({ password }) => (dispatch, getState) => {
  const state = getState()
  
  const { selectedWalletRecoveryForm, recoveryFormMnemonic } = state.login
  
  
  dispatch(resetPasswordWallet(selectedWalletRecoveryForm, recoveryFormMnemonic, password))
  
  dispatch({ type: LOGIN_RESET_RECOVERY_PASSWORD_MODE })
  
  Router.push('/dashboard')
}

export const changeStep = (step) => (dispatch) => {
  dispatch({ type: LOGIN_CHANGE_STEP, step })
}

export const validateRecoveryForm = (mnemonic) => (dispatch, getState) => {
  const state = getState()
  
  const { selectedWalletRecoveryForm } = state.login
  
  return dispatch(validateMnemonicForWallet(selectedWalletRecoveryForm, mnemonic))
  
}

export const setRecoveryFormMnemonic = (mnemonic) => (dispatch, getState) => {
  const state = getState()
  
  return dispatch({ type: LOGIN_SET_RECOVERY_FORM_MNEMONIC, mnemonic})
  
}

export const downloadWallet = () => (dispatch, getState) => {
  const state = getState()
  
  const { selectedWallet } = state.wallet
  
  if (selectedWallet) {
    const text = JSON.stringify(selectedWallet.encrypted.length > 1 ? selectedWallet.encrypted : selectedWallet.encrypted[0])
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', `Wallet.wlt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }
}
