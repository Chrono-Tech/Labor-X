import { createSelector } from 'reselect'

export const jobsSelector = () => (state) => state.jobs

export const jobsListSelector = () => createSelector(
  jobsSelector(),
  (jobs) => jobs.list
)

export const jobByIdSelector = (id) => createSelector(
  jobsSelector(),
  (jobs) => jobs.byKey[`job-${id}`]
)

export const jobsFilteredListSelector = () => createSelector(
  jobsSelector(),
  (jobs) => jobs.filtered
)
