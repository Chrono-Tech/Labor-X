import { createSelector } from "reselect"

export const getState = state => state.reviewApplicants
export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)
export const applicantsSelector = createSelector(getState, state => state.applicants)
export const jobSelector = createSelector(getState, state => state.job)