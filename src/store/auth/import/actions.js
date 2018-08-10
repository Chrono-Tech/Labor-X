// @flow

import uniqueId from 'lodash/uniqueId'
import { push } from "connected-react-router"
import bip39 from "bip39"
import hdkey from "ethereumjs-wallet/hdkey"
import { destroy } from 'redux-form'

import readFile from "src/utils/readFile"
import * as profileApi from "src/api/backend"
import WalletEntryModel from "src/models/wallets/WalletEntryModel"
import { walletAdd } from "src/store/wallet/actions"
import { web3Selector } from "src/store/ethereum/selectors"

import {
  encryptedWalletSelector,
  walletSelector,
  createWalletFormValuesSelector,
  pkeyFormValuesSelector,
  seedFormValuesSelector,
} from "./selectors"
import { CREATE_WALLET_FORM, PKEY_FORM, SEED_FORM } from "./constants"

// IMPORT FILE ACTIONS

export const UPDATE_ENCRYPTED_WALLET_REQUEST = 'AUTH/IMPORT/UPDATE_ENCRYPTED_WALLET_REQUEST'
export const UPDATE_ENCRYPTED_WALLET_SUCCESS = 'AUTH/IMPORT/UPDATE_ENCRYPTED_WALLET_SUCCESS'
export const UPDATE_ENCRYPTED_WALLET_FAILURE = 'AUTH/IMPORT/UPDATE_ENCRYPTED_WALLET_FAILURE'
export const updateEncryptedWalletRequest = (req) => ({ type: UPDATE_ENCRYPTED_WALLET_REQUEST, payload: req })
export const updateEncryptedWalletSuccess = (res) => ({ type: UPDATE_ENCRYPTED_WALLET_SUCCESS, payload: res })
export const updateEncryptedWalletFailure = (err) => ({ type: UPDATE_ENCRYPTED_WALLET_FAILURE, payload: err })
export const updateEncryptedWallet = (file: File) => async (dispatch) => {
  try {
    dispatch(updateEncryptedWalletRequest())
    const fileContent = await readFile(file)
    const fileContentParsed = JSON.parse(fileContent)
    const encryptedWallet = Array.isArray(fileContentParsed) ? fileContentParsed : [ fileContentParsed ]
    dispatch(updateEncryptedWalletSuccess({ encryptedWallet }))
  } catch (err) {
    dispatch(updateEncryptedWalletFailure(err))
  }
}

export const DELETE_ENCRYPTED_WALLET = 'AUTH/IMPORT/DELETE_ENCRYPTED_WALLET'
export const deleteEncryptedWallet = () => ({ type: DELETE_ENCRYPTED_WALLET })

export const SUBMIT_FILE_REQUEST = 'AUTH/IMPORT/SUBMIT_FILE_REQUEST'
export const SUBMIT_FILE_SUCCESS = 'AUTH/IMPORT/SUBMIT_FILE_SUCCESS'
export const SUBMIT_FILE_FAILURE = 'AUTH/IMPORT/SUBMIT_FILE_FAILURE'
export const submitFileRequest = (req) => ({ type: SUBMIT_FILE_REQUEST, payload: req })
export const submitFileSuccess = (res) => ({ type: SUBMIT_FILE_SUCCESS, payload: res })
export const submitFileFailure = (err) => ({ type: SUBMIT_FILE_FAILURE, payload: err })
export const submitFile = () => async (dispatch, getState) => {
  try {
    dispatch(submitFileRequest())
    const state = getState()
    const encryptedWallet = encryptedWalletSelector(state)
    const address = `0x${ encryptedWallet[0].address }`
    const person = await profileApi.getPerson(address)
    if (person) {
      dispatch(push('/auth/import/create-wallet'))
    } else {
      dispatch(showPerson404Dialog())
    }
    dispatch(submitFileSuccess())
  } catch (err) {
    dispatch(submitFileFailure(err))
  }
}

export const submitFilePerson404 = () => (dispatch) => {
  dispatch(push('/auth/signup/account-password'))
}

// IMPORT PKEY ACTIONS

export const SUBMIT_PKEY_REQUEST = 'AUTH/IMPORT/SUBMIT_PKEY_REQUEST'
export const SUBMIT_PKEY_SUCCESS = 'AUTH/IMPORT/SUBMIT_PKEY_SUCCESS'
export const SUBMIT_PKEY_FAILURE = 'AUTH/IMPORT/SUBMIT_PKEY_FAILURE'
export const submitPkeyRequest = (req) => ({ type: SUBMIT_PKEY_REQUEST, payload: req })
export const submitPkeySuccess = (res) => ({ type: SUBMIT_PKEY_SUCCESS, payload: res })
export const submitPkeyFailure = (err) => ({ type: SUBMIT_PKEY_FAILURE, payload: err })
export const submitPkey = () => async (dispatch, getState) => {
  try {
    dispatch(submitPkeyRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const { privateKey } = pkeyFormValuesSelector(state)
    const account = web3.eth.accounts.privateKeyToAccount(`0x${ privateKey }`)
    const address = account.address
    const person = await profileApi.getPerson(address)
    if (person) {
      web3.eth.accounts.wallet.clear()
      const wallet = web3.eth.accounts.wallet.create()
      wallet.add(account)
      dispatch(updateWallet(wallet))
      dispatch(push('/auth/import/create-wallet'))
    } else {
      dispatch(showPerson404Dialog())
    }
    dispatch(submitPkeySuccess())
  } catch (err) {
    dispatch(submitPkeyFailure(err))
  }
}

export const submitPkeyPerson404 = () => (dispatch, getState) => {
  const state = getState()
  const web3 = web3Selector()(state)
  const { privateKey } = pkeyFormValuesSelector(state)
  const account = web3.eth.accounts.privateKeyToAccount(`0x${ privateKey }`)
  web3.eth.accounts.wallet.clear()
  const wallet = web3.eth.accounts.wallet.create()
  wallet.add(account)
  dispatch(updateWallet(wallet))
  dispatch(push('/auth/signup/account-password'))
}

// IMPORT SEED ACTIONS

export const SUBMIT_SEED_REQUEST = 'AUTH/IMPORT/SUBMIT_SEED_REQUEST'
export const SUBMIT_SEED_SUCCESS = 'AUTH/IMPORT/SUBMIT_SEED_SUCCESS'
export const SUBMIT_SEED_FAILURE = 'AUTH/IMPORT/SUBMIT_SEED_FAILURE'
export const submitSeedRequest = (req) => ({ type: SUBMIT_SEED_REQUEST, payload: req })
export const submitSeedSuccess = (res) => ({ type: SUBMIT_SEED_SUCCESS, payload: res })
export const submitSeedFailure = (err) => ({ type: SUBMIT_SEED_FAILURE, payload: err })
export const submitSeed = () => async (dispatch, getState) => {
  try {
    dispatch(submitSeedRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const { mnemonic } = seedFormValuesSelector(state)
    const seed = bip39.mnemonicToSeed(mnemonic)
    const hdWallet = hdkey.fromMasterSeed(seed).derivePath("m/44'/60'/0'/0/0'").getWallet()
    const privateKey = `0x${ hdWallet.getPrivateKey().toString('hex') }`
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    const address = account.address
    const person = await profileApi.getPerson(address)
    if (person) {
      web3.eth.accounts.wallet.clear()
      const wallet = web3.eth.accounts.wallet.create()
      wallet.add(account)
      dispatch(updateWallet(wallet))
      dispatch(push('/auth/import/create-wallet'))
    } else {
      dispatch(showPerson404Dialog())
    }
    dispatch(submitSeedSuccess())
  } catch (err) {
    dispatch(submitSeedFailure(err))
  }
}

export const submitSeedPerson404Dialog = () => (dispatch, getState) => {
  const state = getState()
  const web3 = web3Selector()(state)
  const { mnemonic } = seedFormValuesSelector(state)
  const seed = bip39.mnemonicToSeed(mnemonic)
  const hdWallet = hdkey.fromMasterSeed(seed).derivePath("m/44'/60'/0'/0/0'").getWallet()
  const privateKey = `0x${ hdWallet.getPrivateKey().toString('hex') }`
  const account = web3.eth.accounts.privateKeyToAccount(privateKey)
  web3.eth.accounts.wallet.clear()
  const wallet = web3.eth.accounts.wallet.create()
  wallet.add(account)
  dispatch(updateWallet(wallet))
  dispatch(push('/auth/signup/account-password'))
}

// OTHER ACTIONS

export const submitCreateWallet = () => (dispatch, getState) => {
  const state = getState()
  const encryptedWallet = encryptedWalletSelector(state)
  if (encryptedWallet) {
    const { name } = createWalletFormValuesSelector(state)
    const walletEntryModel = new WalletEntryModel({ key: uniqueId(), name, encrypted: encryptedWallet })
    dispatch(walletAdd(walletEntryModel))
    dispatch(push('/auth/signin/my-accounts'))
  } else {
    const wallet = walletSelector(state)
    const { name, password } = createWalletFormValuesSelector(state)
    const encryptedWallet = wallet.encrypt(password)
    const walletEntryModel = new WalletEntryModel({ key: uniqueId(), name, encrypted: encryptedWallet })
    dispatch(walletAdd(walletEntryModel))
    dispatch(destroy(PKEY_FORM, SEED_FORM, CREATE_WALLET_FORM))
    dispatch(resetState())
    dispatch(push('/auth/signin/my-accounts'))
  }
}

export const SHOW_PERSON_404_DIALOG = 'AUTH/IMPORT/SHOW_PERSON_404_DIALOG'
export const HIDE_PERSON_404_DIALOG = 'AUTH/IMPORT/HIDE_PERSON_404_DIALOG'
export const showPerson404Dialog = () => ({ type: SHOW_PERSON_404_DIALOG })
export const hidePerson404Dialog = () => ({ type: HIDE_PERSON_404_DIALOG })

export const UPDATE_WALLET = 'AUTH/IMPORT/UPDATE_WALLET'
export const updateWallet = (wallet) => ({ type: UPDATE_WALLET, wallet })

export const RESET_STATE = 'AUTH/IMPORT/RESET_STATE'
export const resetState = () => ({ type: RESET_STATE })
