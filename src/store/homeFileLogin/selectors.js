import { createSelector } from "reselect"

export const stateSelector = (state) => state.homeFileLogin
export const updateFileLoadingSelector = createSelector(stateSelector, (state) => state.updateFileLoading)
export const updateFileFailureSelector = createSelector(stateSelector, (state) => state.updateFileFailure)
export const walletSelector = createSelector(stateSelector, (state) => state.wallet)
export const isFileValidSelector = createSelector(walletSelector, (wallet) => {
  if (!wallet) return false
  const encrypted = Array.isArray(wallet)
    ? wallet
    : [wallet]

  return encrypted.reduce((result, { id, address, crypto, Crypto, version }) => {
    // debugger
    return result
      // ? (!id || !address || (!crypto && !Crypto) || !version || version !== 3)
      ? (id && address && (crypto || Crypto) && version && version === 3)
      : false
    // if (!result) return
    // if (!account.id || !account.address || (!account.crypto && !account.Crypto) || !account.version || account.version !== 3) {
    //   throw new Error('Illegal format')
    // }
    // return {
    //   id: account.id,
    //   crypto: account.crypto || account.Crypto,
    //   version: account.version,
    //   address: account.address
    // }
  }, true)
})
