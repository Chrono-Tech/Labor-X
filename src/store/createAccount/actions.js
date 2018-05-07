import uniqid from 'uniqid'
import Router from 'next/router'

import { createWallet, navigateToSelectWallet } from 'store'

export const CREATE_ACCOUNT_SET_MNEMONIC = 'createAccount/setMnemonic'
export const CREATE_ACCOUNT_SET_PASSWORD = 'createAccount/setPassword'
export const CREATE_ACCOUNT_SET_ACCOUNT_TYPES = 'createAccount/setAccountTypes'
export const CREATE_ACCOUNT_SET_CURRENT_WALLET = 'createAccount/setCurrentWallet'

export const setMnemonic = (mnemonic) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT_SET_MNEMONIC, mnemonic })
}

export const setPassword = (password) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT_SET_PASSWORD, password })
}

export const setAccountTypes = (types) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT_SET_ACCOUNT_TYPES, types })
}

export const generateNameWallet = () => (dispatch) => {
  return uniqid()
}

export const setCurrentWallet = (encrypted) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT_SET_CURRENT_WALLET, encrypted})
}

export const createUserAccount = () => (dispatch, getState) => {
  const state = getState()
  
  const { password, mnemonic } = state.createAccount
  const name = dispatch(generateNameWallet())
  
  const encrypted = dispatch(createWallet({ name, password, mnemonic }))
  
  dispatch(setCurrentWallet(encrypted))
  
}

export const downloadWallet = () => (dispatch, getState) => {
  const state = getState()
  
  const { currentWallet } = state.createAccount
  
  if (currentWallet) {
    const text = JSON.stringify(currentWallet.length > 1 ? currentWallet : currentWallet[0])
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
  Router.push('/login')
  dispatch(navigateToSelectWallet())
}
