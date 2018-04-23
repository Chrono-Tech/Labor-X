export const updateWallet = (wallet, name) => {
  return {
    ...wallet,
    name: name
  }
}

export const removeWallet = (walletsList, name) => {
  const list = walletsList.filter((w) => w.name !== name)
  
  return list
}
