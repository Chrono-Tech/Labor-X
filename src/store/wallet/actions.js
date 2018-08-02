import uniqid from 'uniqid'
import bip39 from 'bip39'
import { WalletModel, WalletEntryModel } from 'src/models'
import { replaceWallet, getWalletAddress } from 'src/utils'
import { web3Selector } from '../ethereum/selectors'

// import { changeStep as loginChangeStep } from './../login/actions'

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

  dispatch(walletSelect(wallet))

  dispatch({ type: WALLETS_UPDATE_LIST, walletsList: updatedWalletList })

}

export const walletRemove = (name) => (dispatch) => {
  dispatch({ type: WALLETS_REMOVE, name })
}

export const decryptWallet = (entry, password) => async (dispatch, getState) => {
  const web3 = web3Selector()(getState())
  web3.eth.accounts.wallet.clear()

  let wallet =  web3.eth.accounts.wallet.decrypt(entry.encrypted, password)

  const model = new WalletModel({
    entry,
    wallet,
  })

  dispatch(walletLoad(model))

  return model
}

export const validateWalletName = (name) => (dispatch, getState) => {
  const state = getState()

  const { walletsList } = state.wallet

  return !walletsList.find((item) => item.name === name)
}

export const validateMnemonicForWallet = (wallet, mnemonic) => (dispatch, getState) => {
  const web3 = web3Selector()(getState())
  web3.eth.accounts.wallet.clear()

  // const state = getState()

  const addressFromWallet = `0x${getWalletAddress(wallet)}`

  const account = web3.eth.accounts.privateKeyToAccount(`0x${bip39.mnemonicToSeedHex(mnemonic)}`)
  const address = account && account.address && account.address.toLowerCase()

  return addressFromWallet === address
}

export const resetPasswordWallet = (wallet, mnemonic, password) => (dispatch, getState) => {
  const web3 = web3Selector()(getState())
  web3.eth.accounts.wallet.clear()

  const newCopy = dispatch(createWallet({ name: wallet.name, mnemonic, password }))

  let newWallet = {
    ...wallet,
    encrypted: newCopy.encrypted,
  }

  dispatch(walletUpdate(newWallet))
}

export const createWallet = ({ name, password, privateKey, mnemonic, numberOfAccounts = 0, types = null }) => async (dispatch, getState) => {
  const state = getState()
  const web3 = web3Selector()(state)
  web3.eth.accounts.wallet.clear()
  const wallet = web3.eth.accounts.wallet.create(numberOfAccounts)

  let account

  if (privateKey) {
    account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey.startsWith('0x') ? privateKey.substr(2) : privateKey}`)
  }

  if (mnemonic) {
    account = web3.eth.accounts.privateKeyToAccount(`0x${bip39.mnemonicToSeedHex(mnemonic)}`)
  }

  wallet.add(account)

  const walletEntry =  new WalletEntryModel({
    key: uniqid(),
    name,
    types,
    encrypted: wallet.encrypt(password),
  })

  // if (types) {
  //   await dispatch(setUserAccountTypes(`0x${walletEntry.encrypted[0].address}`, types, account))
  // }

  return walletEntry
}
