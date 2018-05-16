import { createSelector } from 'reselect'

export const ethereumSelector = () => (state) => state.ethereum

export const web3Selector = () => createSelector(
  ethereumSelector(),
  (ethereum) => ethereum == null // nil check
    ? null
    : ethereum.web3.value
)
