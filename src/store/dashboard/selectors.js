import { createSelector } from 'reselect'

export const getState = state => state.dashboard
export const getBalance = createSelector(getState, state => state.balance)