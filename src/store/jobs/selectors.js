import { createSelector } from 'reselect'
import { currentAddressSelector } from "../"
import {JOB_STATE_ACCEPTED, JOB_STATE_STARTED} from "../../models"

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

export const todoJobsSelector = () => createSelector(
  jobsListSelector(),
  currentAddressSelector(),
  (jobsList, currentAddress) => jobsList.filter(
    x =>
      x.worker &&
      x.worker.toLowerCase() === currentAddress.toLowerCase() &&
      (x.state.name === JOB_STATE_ACCEPTED.name || x.state.name === JOB_STATE_STARTED.name)
  ),
)
