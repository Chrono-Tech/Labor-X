import uniqueId from 'lodash/uniqueId'
import bip39 from 'bip39'
import { push } from 'connected-react-router'
import { destroy, change } from 'redux-form'

import * as profileApi from 'src/api/backend'
import WalletEntryModel from "src/models/wallets/WalletEntryModel"
import { userSave } from "src/store/user/actions"
import { WalletModel } from "src/models"
import { walletLoad, walletAdd } from "src/store/wallet/actions"
import { web3Selector } from "src/store/ethereum/selectors"
import mnemonicToWallet from "src/utils/mnemonicToWallet"
import { encryptedWalletSelector, walletSelector } from "src/store/auth/import/selectors"
import UserModel from "src/models/app/UserModel"

import { accountPasswordFormValuesSelector, mnemonicSelector } from "./selectors"
import {
  ACCOUNT_PASSWORD_FORM,
  CONFIRM_BACK_UP_FORM,
  COPY_YOUR_ACCOUNT_PASSWORD_FORM,
} from "./constants"

export const SET_MNEMONIC = 'AUTH/SIGNUP/SET_MNEMONIC'
export const setMnemonic = (mnemonic) => ({ type: SET_MNEMONIC, mnemonic })

// SUBMIT ACTIONS

export const submitAccountPassword = () => async (dispatch, getState) => {
  const state = getState()
  const encryptedWallet = encryptedWalletSelector(state)
  const wallet = walletSelector(state)
  if (encryptedWallet || wallet) {
    dispatch(push('/auth/signup/welcome'))
  } else {
    dispatch(setMnemonic(bip39.generateMnemonic()))
    dispatch(push('/auth/signup/copy-your-account-password'))
  }
}

export const submitCopyYourAccountPassword = () => (dispatch) => {
  dispatch(push('/auth/signup/confirm-back-up'))
}

export const submitConfirmBackUp = () => (dispatch) => {
  dispatch(push('/auth/signup/your-wallet-file'))
}

export const submitYourWalletFile = () => (dispatch) => {
  dispatch(push('/auth/signup/welcome'))
}

export const SUBMIT_WELCOME_REQUEST = 'AUTH/SIGNUP/SUBMIT_WELCOME_REQUEST'
export const SUBMIT_WELCOME_SUCCESS = 'AUTH/SIGNUP/SUBMIT_WELCOME_SUCCESS'
export const SUBMIT_WELCOME_FAILURE = 'AUTH/SIGNUP/SUBMIT_WELCOME_FAILURE'
export const submitWelcomeRequest = () => ({ type: SUBMIT_WELCOME_REQUEST })
export const submitWelcomeSuccess = () => ({ type: SUBMIT_WELCOME_SUCCESS })
export const submitWelcomeFailure = () => ({ type: SUBMIT_WELCOME_FAILURE })
export const submitWelcome = () => async (dispatch, getState) => {
  try {
    dispatch(submitWelcomeRequest())
    const state = getState()
    const encryptedWallet = encryptedWalletSelector(state)
    const wallet = walletSelector(state)
    const { roles, name, password } = accountPasswordFormValuesSelector(state)
    const web3 = web3Selector()(state)
    if (encryptedWallet) {
      const wallet = web3.eth.accounts.wallet.decrypt(encryptedWallet, password)
      const walletEntryModel = new WalletEntryModel({ key: uniqueId(), name, encrypted: encryptedWallet })
      dispatch(walletAdd(walletEntryModel))
      const walletModel = new WalletModel({ entry: walletEntryModel, wallet })
      dispatch(walletLoad(walletModel))
      const account = wallet[0]
      await profileApi.signup(account, roles)
      const { token, profile, client, worker, recruiter } = await profileApi.signin(account)
      const user = UserModel.fromJson({ token, profile, client, worker, recruiter })
      dispatch(userSave(user))
    } else if (wallet) {
      const encryptedWallet = wallet.encrypt(password)
      const walletEntryModel = new WalletEntryModel({ key: uniqueId(), name, encrypted: encryptedWallet })
      dispatch(walletAdd(walletEntryModel))
      const walletModel = new WalletModel({ entry: walletEntryModel, wallet })
      dispatch(walletLoad(walletModel))
      const account = wallet[0]
      await profileApi.signup(account, roles)
      const { token, profile, client, worker, recruiter } = await profileApi.signin(account)
      const user = UserModel.fromJson({ token, profile, client, worker, recruiter })
      dispatch(userSave(user))
    } else {
      const mnemonic = mnemonicSelector(state)
      const wallet = mnemonicToWallet(web3, mnemonic)
      const encryptedWallet = wallet.encrypt(password)
      const walletEntryModel = new WalletEntryModel({ key: uniqueId(), name, encrypted: encryptedWallet })
      dispatch(walletAdd(walletEntryModel))
      const walletModel = new WalletModel({ entry: walletEntryModel, wallet })
      dispatch(walletLoad(walletModel))
      const account = wallet[0]
      await profileApi.signup(account, roles)
      const { token, profile, client, worker, recruiter } = await profileApi.signin(account)
      const user = UserModel.fromJson({ token, profile, client, worker, recruiter })
      dispatch(userSave(user))
    }
    dispatch(destroy(ACCOUNT_PASSWORD_FORM, COPY_YOUR_ACCOUNT_PASSWORD_FORM, CONFIRM_BACK_UP_FORM))
    dispatch(push('/dashboard'))
    dispatch(submitWelcomeSuccess())
  } catch (err) {
    dispatch(submitWelcomeFailure(err))
  }
}

// OTHER ACTIONS

export const downloadWallet = () => (dispatch, getState) => {
  const state = getState()
  const web3 = web3Selector()(state)
  const mnemonic = mnemonicSelector(state)
  const { password } = accountPasswordFormValuesSelector(state)
  const wallet = mnemonicToWallet(web3, mnemonic)
  const encryptedWallet = wallet.encrypt(password)
  const text = JSON.stringify(encryptedWallet.length > 1 ? encryptedWallet : encryptedWallet[0])
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', `Wallet.wlt`)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export const setMnemonicConfirmation = (mnemonicConfirmation) => (dispatch) => {
  dispatch(change(CONFIRM_BACK_UP_FORM, 'mnemonicConfirmation', mnemonicConfirmation))
}
