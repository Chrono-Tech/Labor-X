import { createSelector } from "reselect"

export const getState = state => state.postedJobs
export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)
export const getCards = createSelector(getState, state => state.cards)