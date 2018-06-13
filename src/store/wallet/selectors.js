import { createSelector } from 'reselect'

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
  walletModelSelector(),
  (wallet) => wallet ? wallet.wallet[0].address : null
)