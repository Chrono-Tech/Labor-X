import { createSelector } from 'reselect'
import { JOB_STATE_STARTED } from 'src/models'

export const jobsSelector = () => (state) => state.jobs

export const jobsListSelector = () => createSelector(
  jobsSelector(),
  (jobs) => jobs.list
)

export const workerJobListSelector = () => createSelector(
  jobsSelector(),
  (jobs) => jobs.workerList
)

export const jobByIdSelector = (id) => createSelector(
  jobsSelector(),
  (jobs) => jobs.byKey[`job-${id}`]
)

export const todoJobsSelector = () => createSelector(
  jobsListSelector(),
  (jobsList) => {
    return jobsList.filter((job) => job.state && job.state === JOB_STATE_STARTED)
  }
)
