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
