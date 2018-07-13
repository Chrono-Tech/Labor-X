import { createSelector } from 'reselect'

export const getState = state => state.myWallet
export const getSearchTransactionLoading = createSelector(getState, state => state.searchTransactionLoading)
export const getTransactions = createSelector(getState, state => state.transactions)
export const getSearchTransactionFailure = createSelector(getState, state => state.searchTransactionFailure)