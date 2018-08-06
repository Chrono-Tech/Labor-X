import { createSelector } from 'reselect'
import getFormValues from 'redux-form/lib/getFormValues'

import { PKEY_FORM, SEED_FORM, CREATE_WALLET_FORM } from "./constants"

export const stateSelector = (state) => state.auth.import
export const encryptedWalletSelector = createSelector(stateSelector, (state) => state.encryptedWallet)
export const walletSelector = createSelector(stateSelector, (state) => state.wallet)
export const updateEncryptedWalletLoadingSelector = createSelector(stateSelector, (state) => state.updateEncryptedWalletLoading)
export const updateEncryptedWalletFailureSelector = createSelector(stateSelector, (state) => state.updateEncryptedWalletFailure)
export const submitFileLoadingSelector = createSelector(stateSelector, (state) => state.submitFileLoading)
export const submitFileFailureSelector = createSelector(stateSelector, (state) => state.submitFileFailure)
export const submitPkeyLoadingSelector = createSelector(stateSelector, (state) => state.submitPkeyLoading)
export const submitPkeyFailureSelector = createSelector(stateSelector, (state) => state.submitPkeyFailure)
export const submitSeedLoadingSelector = createSelector(stateSelector, (state) => state.submitSeedLoading)
export const submitSeedFailureSelector = createSelector(stateSelector, (state) => state.submitSeedFailure)
export const openPerson404DialogSelector = createSelector(stateSelector, (state) => state.openPerson404Dialog)
export const pkeyFormValuesSelector = (state) => getFormValues(PKEY_FORM)(state)
export const seedFormValuesSelector = (state) => getFormValues(SEED_FORM)(state)
export const createWalletFormValuesSelector = (state) => getFormValues(CREATE_WALLET_FORM)(state)
export const isEcnryptedWalletValidSelector = createSelector(encryptedWalletSelector, (encryptedWallet) => {
  if (!encryptedWallet) return false
  return encryptedWallet.every(({ id, address, crypto, Crypto, version }) => (id && address && (crypto || Crypto) && version && version === 3))
})
