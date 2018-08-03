import uniqueId from 'lodash/uniqueId'
import bip39 from 'bip39'
import { push } from 'connected-react-router'
import { destroy, change } from 'redux-form'

import * as profileApi from 'src/api/backend'
import WalletEntryModel from "src/models/wallets/WalletEntryModel"
import { userSave } from "src/store/user/actions"
import { UserAccountTypesModel, WalletModel } from "src/models"
import { walletLoad, walletAdd } from "src/store/wallet/actions"
import { web3Selector } from "src/store/ethereum/selectors"
import mnemonicToWallet from "src/utils/mnemonicToWallet"
import { accountPasswordFormValuesSelector, mnemonicSelector } from "./selectors"
import {
  ACCOUNT_PASSWORD_FORM,
  CONFIRM_BACK_UP_FORM,
  COPY_YOUR_ACCOUNT_PASSWORD_FORM,
} from "./constants"

export const SET_MNEMONIC = 'SIGNUP/SET_MNEMONIC'
export const setMnemonic = (mnemonic) => ({ type: SET_MNEMONIC, mnemonic })

export const setMnemonicConfirmation = (mnemonicConfirmation) => (dispatch) => {
  dispatch(change(CONFIRM_BACK_UP_FORM, 'mnemonicConfirmation', mnemonicConfirmation))
}

export const submitAccountPassword = () => (dispatch) => {
  dispatch(setMnemonic(bip39.generateMnemonic()))
  dispatch(push('/copy-your-account-password'))
}

export const submitCopyYourAccountPassword = () => (dispatch) => {
  dispatch(push('/confirm-back-up'))
}

export const submitConfirmBackUp = () => (dispatch) => {
  dispatch(push('/your-wallet-file'))
}

export const submitYourWalletFile = () => (dispatch) => {
  dispatch(push('/welcome'))
}

export const SUBMIT_WELCOME_REQUEST = 'SIGNUP/SUBMIT_WELCOME_REQUEST'
export const SUBMIT_WELCOME_SUCCESS = 'SIGNUP/SUBMIT_WELCOME_SUCCESS'
export const SUBMIT_WELCOME_FAILURE = 'SIGNUP/SUBMIT_WELCOME_FAILURE'
export const submitWelcomeRequest = () => ({ type: SUBMIT_WELCOME_REQUEST })
export const submitWelcomeSuccess = () => ({ type: SUBMIT_WELCOME_SUCCESS })
export const submitWelcomeFailure = () => ({ type: SUBMIT_WELCOME_FAILURE })
export const submitWelcome = () => async (dispatch, getState) => {
  try {

    dispatch(submitWelcomeRequest())

    const state = getState()

    const mnemonic = mnemonicSelector(state)
    const { roles, name, password } = accountPasswordFormValuesSelector(state)
    const web3 = web3Selector()(state)

    const wallet = mnemonicToWallet(web3, mnemonic)

    // add to wallet store
    const encryptedWallet = wallet.encrypt(password)
    const walletEntryModel = new WalletEntryModel({ key: uniqueId(), name, encrypted: encryptedWallet })
    dispatch(walletAdd(walletEntryModel))
    const walletModel = new WalletModel({ entry: walletEntryModel, wallet })
    dispatch(walletLoad(walletModel))

    // register in profile service
    const account = wallet[0]
    await profileApi.signup(account, roles)
    const { token, profile, client, worker, recruiter } = await profileApi.signin(account)
    const accountTypes = new UserAccountTypesModel({
      client: client.isRequested,
      worker: worker.isRequested,
      recruiter: recruiter.isRequested,
    })

    dispatch(userSave({ token, profile, client, worker, recruiter, accountTypes }))

    dispatch(destroy(ACCOUNT_PASSWORD_FORM, COPY_YOUR_ACCOUNT_PASSWORD_FORM, CONFIRM_BACK_UP_FORM))

    dispatch(push('/dashboard'))

    dispatch(submitWelcomeSuccess())

  } catch (err) {

    dispatch(submitWelcomeFailure())

  }

}

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

