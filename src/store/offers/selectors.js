import { createSelector } from 'reselect'

export const offersSelector = () => (state) => state.offers

export const jobsOffersSelector = (jobId) => createSelector(
  offersSelector(),
  (offers) => offers.byJobKey[`job-${jobId}`]
)

export const offersListSelector = () => createSelector(
  offersSelector(),
  (offers) => offers.list
)
