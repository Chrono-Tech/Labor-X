import Web3 from 'web3'

export const WALLETS_CREATE = 'wallets/create'
export const WALLETS_SELECT = 'wallets/select'
export const WALLETS_UPDATE = 'wallets/update'
export const WALLETS_REMOVE = 'wallets/remove'

export const walletCreate = (wallet) => (dispatch) => {
  dispatch({ type: WALLETS_CREATE, wallet })
}

export const walletSelect = (wallet) => (dispatch) => {
  dispatch({ type: WALLETS_SELECT, wallet })
}

export const walletUpdate = (wallet, name) => (dispatch) => {
  dispatch({ type: WALLETS_UPDATE, wallet, name })
}

export const walletRemove = (name) => (dispatch) => {
  dispatch({ type: WALLETS_REMOVE, name })
}

export const loadWallet = (wallet, password) => (dispatch) => {
  let walletDecrypted = Web3.eth.accounts.wallet.decrypt(wallet.encrypted, password)
  
    dispatch(walletSelect(walletDecrypted))
  
}

export const createWallet = await ({ name, password, seed, mnemonic, numbeOfAccounts = 0 }) {
  const wallet = web3.eth.accounts.wallet.create(numbeOfAccounts)
  if (seed) {
    const account = await web3.eth.accounts.privateKeyToAccount(seed)
    await wallet.add(account)
  }
  if (mnemonic) {
    const account = await web3.eth.accounts.privateKeyToAccount(`0x${bip39.mnemonicToSeedHex(mnemonic)}`)
    await wallet.add(account)
  }
  const entry = new WalletEntryModel({
    key: uniqid(),
    name,
    encrypted: wallet.encrypt(password)
  })
  dispatch(walletCreate(entry))
  // return new WalletModel({
  //   entry,
  //   wallet
  // })
},
