import { createSelector } from 'reselect'

export const walletsSelector = () => (state) => state.wallet
export const walletsListSelector = createSelector(walletsSelector(), (wallets) => wallets.walletsList)
export const walletByAddressSelector = (address) => createSelector(walletsListSelector, (wallets) => wallets.find((x) => `0x${x.encrypted[0].address}` === address))

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

