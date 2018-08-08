import { createSelector } from "reselect"


export const getState = state => state.secondMenu

export const personProfileLoadingStateSelector = createSelector(getState, state => state.personProfileLoading)

export const personProfileSelector = createSelector(
  getState,
  (state) => state.personProfile
)
