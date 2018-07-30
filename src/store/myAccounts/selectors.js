import { createSelector } from "reselect"

export const stateSelector = (state) => state.myAccounts
export const getInitialPropsLoadingSelector = createSelector(stateSelector, (state) => state.getInitialPropsLoading)
export const personsSelector = createSelector(stateSelector, (state) => state.persons)