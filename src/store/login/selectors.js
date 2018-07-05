import { createSelector } from 'reselect'

export const getState = state => state.login
export const getOpenAccount404Dialog = createSelector(getState, state => state.openAccount404Dialog)