import { createSelector } from 'reselect'
import { JOB_STATE_STARTED } from 'src/models'
import { currentAddressSelector } from "../wallet/selectors"
import { JOB_STATE_OFFER_ACCEPTED, JOB_STATE_PENDING_START, JOB_STATE_FINISHED, JOB_STATE_PENDING_FINISH, JOB_STATE_FINALIZED } from "../../models"
import t from "typy";

const finishedIndexes = [JOB_STATE_FINISHED.index, JOB_STATE_PENDING_FINISH.index, JOB_STATE_FINALIZED.index];

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


export const countFinishedJobsByWorkerSelector = (workerId) => createSelector(
  jobsSelector(),
  (jobs) => {
    const reducer = (accumulator, job) => {
      if (job.worker === workerId && finishedIndexes.includes(t(job, "state.index").safeObject))
        return accumulator + 1
      else
        return accumulator
    }
    return jobs.list.reduce(reducer, 0)
  }
)


export const finishedJobsByWorkerSelector = (workerId) => createSelector(
  jobsSelector(),
  (jobs) => {
    return jobs.list.filter((job) => {
      return job.worker === workerId && JOB_STATE_FINISHED.index ===  t(job, "state.index").safeObject
    })
  }
)

export const finalizedJobsByWorkerSelector = (workerId) => createSelector(
  jobsSelector(),
  (jobs) => {
    return jobs.list.filter((job) => {
      return job.worker === workerId && JOB_STATE_PENDING_FINISH.index ===  t(job, "state.index").safeObject
    })
  }
)


export const pendingFinishJobsByWorkerSelector = (workerId) => createSelector(
  jobsSelector(),
  (jobs) => {
    return jobs.list.filter((job) => {
      return job.worker === workerId && JOB_STATE_FINALIZED.index ===  t(job, "state.index").safeObject
    })
  }
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
