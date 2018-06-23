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

export const offersListByWorkerSelector = (worker) => createSelector(
  offersSelector(),
  (offers) => offers.list.filter((item) => item.worker === worker)
)

export const offersCountForJobSelector = (jobId) => createSelector(
  offersSelector(),
  (offers) => offers.list.filter((item) => item.jobId === jobId).length
)
