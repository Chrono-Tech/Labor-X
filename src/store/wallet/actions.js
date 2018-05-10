import Web3 from 'src/network/Web3Provider'
import uniqid from 'uniqid'
import bip39 from 'bip39'
import {WalletModel, WalletEntryModel} from 'src/models'
import { replaceWallet, getWalletAddress } from 'src/utils'


export const WALLETS_ADD = 'wallets/add'
export const WALLETS_SELECT = 'wallets/select'
export const WALLETS_LOAD = 'wallets/load'
export const WALLETS_UPDATE_LIST = 'wallets/updateList'
export const WALLETS_REMOVE = 'wallets/remove'

export const walletAdd = (wallet) => (dispatch) => {
  dispatch({ type: WALLETS_ADD, wallet })
}

export const walletSelect = (wallet) => (dispatch) => {
  dispatch({ type: WALLETS_SELECT, wallet })
}

export const walletLoad = (wallet) => (dispatch) => {
  dispatch({ type: WALLETS_LOAD, wallet })
}

export const walletUpdateList = (walletList) => (dispatch) => {
  dispatch({ type: WALLETS_UPDATE_LIST, walletList })
}

export const walletUpdate = (wallet) => (dispatch, getState) => {
  const state = getState()
  
  const { walletsList } = state.wallet
  
  const updatedWalletList = replaceWallet(wallet, walletsList)
  console.log('walletUpdate', wallet, updatedWalletList)
  
  dispatch(walletSelect(wallet))
  
  console.log('updated', updatedWalletList)
  
  dispatch({ type: WALLETS_UPDATE_LIST, walletsList: updatedWalletList })
  
}

export const walletRemove = (name) => (dispatch) => {
  dispatch({ type: WALLETS_REMOVE, name })
}

export const decryptWallet = (entry, password) => (dispatch) => {
  let web3 = Web3.getWeb3()
  web3.eth.accounts.wallet.clear()
  
  let wallet = web3.eth.accounts.wallet.decrypt(entry.encrypted, password)

  const model = new WalletModel({
    entry,
    wallet,
  })

  dispatch(walletLoad(model))

}

export const validateWalletName = (name) => (dispatch, getState) => {
  const state = getState()
  
  const { walletsList } = state.wallet
  
  return !walletsList.find((item) => item.name === name)
}

export const validateMnemonicForWallet = (wallet, mnemonic) => (dispatch, getState) => {
  let web3 = Web3.getWeb3()
  web3.eth.accounts.wallet.clear()
  
  const state = getState()
  
  const addressFromWallet = `0x${getWalletAddress(wallet)}`
  
  const account = web3.eth.accounts.privateKeyToAccount(`0x${bip39.mnemonicToSeedHex(mnemonic)}`)
  const address = account && account.address && account.address.toLowerCase()
  
  return addressFromWallet === address
}

export const resetPasswordWallet = (wallet, mnemonic, password) => (dispatch) => {
  let web3 = Web3.getWeb3()
  web3.eth.accounts.wallet.clear()
  
  console.log('resetpassword', wallet, mnemonic, password)
  
  const newCopy = dispatch(createWallet({ name: wallet.name, mnemonic, password}))
  
  
  
  let newWallet = {
    ...wallet,
    encrypted: newCopy.encrypted,
  }
  
  console.log('resetpassword newCopy', newCopy, newWallet, {wallet, mnemonic, password})
  
  
  dispatch(walletUpdate(newWallet))
}

export const createWallet = ({ name, password, privateKey, mnemonic, numberOfAccounts = 0, types = {} }) => (dispatch) => {
  let web3 = Web3.getWeb3()
  web3.eth.accounts.wallet.clear()
  let wallet = web3.eth.accounts.wallet.create(numberOfAccounts)

  if (privateKey) {
    const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`)
    console.log('address', account && account.address, account)
    wallet.add(account)
  }

  if (mnemonic) {
    const account = web3.eth.accounts.privateKeyToAccount(`0x${bip39.mnemonicToSeedHex(mnemonic)}`)
    console.log('address', account && account.address, account)
    wallet.add(account)
  }
  console.log('createWallet', wallet)
  
  return new WalletEntryModel({
    key: uniqid(),
    name,
    types,
    encrypted: wallet.encrypt(password),
  })
  
}

export const logout = () => (dispatch) => {
  dispatch(walletSelect(null))
}
