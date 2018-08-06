import { createSelector } from 'reselect'

export const stateSelector = (state) => state.wallet
export const walletsSelector = () => (state) => state.wallet

export const walletModelSelector = () => createSelector(
  walletsSelector(),
  (wallets) => wallets == null // nil check
    ? null
    : wallets.decryptedWallet
)

export const signerSelector = () => createSelector(
  walletModelSelector(),
  (wallet) => wallet == null // nil check
    ? null
    : wallet.signer
)

export const currentAddressSelector = () => createSelector(
  signerSelector(),
  (signer) => signer ? signer.address : null
)

export const selectedWalletSelector = createSelector(stateSelector, (state) => state.selectedWallet)
export const decryptedWalletSelector = createSelector(stateSelector, (state) => state.decryptedWallet)
export const walletEntriesSelector = createSelector(stateSelector, (state) => state.walletsList)
