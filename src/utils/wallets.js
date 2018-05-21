import bip39 from 'bip39'
import ethUtils from 'ethereumjs-util'

export const updateWallet = (wallet, name) => {
  return {
    ...wallet,
    name: name,
  }
}

export const replaceWallet = (wallet, walletList) => {
  let index = walletList.findIndex((item) => item.key === wallet.key)

  let copyWalletList = [...walletList]

  copyWalletList.splice(index, 1, wallet)

  return copyWalletList
}

export const removeWallet = (walletsList, name) => {
  const list = walletsList.filter((w) => w.name !== name)

  return list
}

export const getWalletAddress = (wallet) => {
  return wallet && wallet.encrypted && wallet.encrypted[0] && wallet.encrypted[0].address || ''
}

// TODO @ipavlenko: Provide better validation, but do not use web3.accounts methods becouse they are mutate inner wallet state
const SEED_REGEXP = /[0-9A-Fa-f]{6}/g

export const isValidSeed = value => {
  return value && value.length >= 64 && SEED_REGEXP.test(value)
}

export const createAddressFromPrivateKey = key => {
  return `0x${ethUtils.privateToAddress(Buffer.from(key, 'hex')).toString('hex')}`
}

export const createAddressFromMnemonic = mnemonic => {
  return createAddressFromPrivateKey(bip39.mnemonicToSeedHex(mnemonic))
}
