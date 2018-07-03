import { Router } from 'src/routes'

import { createWallet, walletAdd, navigateToSelectWallet, navigateToSelectLoginMethod } from 'src/store'
import { generateNameWalletSelector } from "./selectors"
import type Account from "../../models/web3/Account"

export const CREATE_ACCOUNT_SET_MNEMONIC = 'createAccount/setMnemonic'
export const CREATE_ACCOUNT_SET_PASSWORD = 'createAccount/setPassword'
export const CREATE_ACCOUNT_SET_ACCOUNT_TYPES = 'createAccount/setAccountTypes'
export const CREATE_ACCOUNT_SET_CURRENT_WALLET = 'createAccount/setCurrentWallet'
export const CREATE_ACCOUNT_RESET_CURRENT_WALLET = 'createAccount/resetCurrentWallet'

export const DEFAULT_ACCOUNT_PREFFIX = 'My account'

export const setMnemonic = (mnemonic) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT_SET_MNEMONIC, mnemonic })
}

export const setPassword = (password) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT_SET_PASSWORD, password })
}

export const setAccountTypes = (types) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT_SET_ACCOUNT_TYPES, types })
}

export const resetCurrentWallet = () => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT_RESET_CURRENT_WALLET })
}

export const setCurrentWallet = (encrypted) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT_SET_CURRENT_WALLET, encrypted })
}

export const createUserAccount = () => async (dispatch, getState) => {

  const state = getState()

  const { password, mnemonic, accountTypes } = state.createAccount
  const name = generateNameWalletSelector()(state)

  dispatch(resetCurrentWallet())

  const encrypted = await dispatch(createWallet({
    name,
    password,
    mnemonic,
    numberOfAccounts: 0,
    types: accountTypes,
  }))

  dispatch(setCurrentWallet(encrypted))

}

export const downloadWallet = () => (dispatch, getState) => {
  const state = getState()

  const { currentWallet } = state.createAccount

  if (currentWallet) {
    const text = JSON.stringify(currentWallet.encrypted.length > 1 ? currentWallet.encrypted : currentWallet.encrypted[0])
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', `Wallet.wlt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }
}

export const navigateToSelectWalletPage = () => (dispatch) => {
  Router.pushRoute('/login')
  dispatch(navigateToSelectWallet())
}

export const onFinishCreateAccount = () => (dispatch, getState) => {
  const state = getState()

  const { currentWallet } = state.createAccount

  dispatch(walletAdd(currentWallet))

  Router.pushRoute('/login')

}

export const navigateToSelectMethod = () => (dispatch) => {
  Router.pushRoute('/login')
  dispatch(navigateToSelectLoginMethod())
}

export const EXISTING_ACCOUNT_CREATE = 'CREATE_ACCOUNT/EXISTING_ACCOUNT_CREATE'
export const setAccount = (account: Account) => ({ type: EXISTING_ACCOUNT_CREATE, payload: account })
