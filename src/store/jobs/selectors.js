import { createSelector } from 'reselect'
import { currentAddressSelector } from "../wallet/selectors"
import { JOB_STATE_OFFER_ACCEPTED, JOB_STATE_PENDING_START, JOB_STATE_STARTED } from "../../models"

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
  currentAddressSelector(),
  (jobsList, address) => address
    ? jobsList.filter((job) => (
      job.worker === address.toLowerCase() &&
      job.state &&
      (job.state === JOB_STATE_STARTED || job.state === JOB_STATE_OFFER_ACCEPTED || job.state === JOB_STATE_PENDING_START)
    )) : []
)
