// @flow
import { createSelector } from "reselect"

export const getState = state => state.dashboard

export const pageDataLoadingSelector = createSelector(getState, state => state.pageDataLoading)
export const pageDataFailureSelector = createSelector(getState, state => state.pageDataFailure)
export const pageDataSelector = createSelector(getState, state => state.pageData)
