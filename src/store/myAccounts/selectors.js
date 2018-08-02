import { createSelector } from "reselect"

export const stateSelector = (state) => state.myAccounts
export const getInitialPropsLoadingSelector = createSelector(stateSelector, (state) => state.getInitialPropsLoading)
export const accountsSelector = createSelector(stateSelector, (state) => state.accounts)