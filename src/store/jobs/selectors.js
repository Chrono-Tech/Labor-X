import moment from 'moment'
import t from "typy"
import { createSelector } from 'reselect'
import { JOB_STATE_STARTED } from 'src/models'
import { currentAddressSelector } from "../wallet/selectors"
import { JOB_STATE_OFFER_ACCEPTED, JOB_STATE_PENDING_START, JOB_STATE_FINISHED, JOB_STATE_PENDING_FINISH, JOB_STATE_FINALIZED } from "../../models"

const finishedIndexes = [JOB_STATE_FINISHED.index, JOB_STATE_PENDING_FINISH.index, JOB_STATE_FINALIZED.index]
const paidFinishIndexes = [JOB_STATE_FINISHED.index, JOB_STATE_FINALIZED.index]

const getJobEndDate = (job) => {
  const jobStateIndex = t(job, "state.index").safeObject
  if (jobStateIndex === JOB_STATE_FINISHED.index)
  {return moment(t(job, "extra.finishTime").safeObject)}
  if (jobStateIndex === JOB_STATE_FINALIZED.index)
  {return moment(t(job, "extra.finalizedAt").safeObject)}
  return moment().add('years', 5)
}

const checkEntryDateToLastMonth = (date) => {
  const nowSubtractMonth = moment().subtract(1, 'months')
  return date.isBetween(nowSubtractMonth, moment())
}

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
      const jobStateIndex = t(job, "state.index").safeObject
      if (job.worker === workerId && finishedIndexes.includes(jobStateIndex))
      {return accumulator + 1}
      else
      {return accumulator}
    }
    return jobs.list.reduce(reducer, 0)
  }
)

export const totalWorkerEraningSelector = (workerId) => createSelector(
  jobsSelector(),
  (jobs) => {
    const reducer = (accumulator, job) => {
      const jobStateIndex = t(job, "state.index").safeObject
      if (job.worker === workerId && finishedIndexes.includes(jobStateIndex)) {
        const fixedPrice = t(job, "ipfs.budget.fixedPrice").safeObject
        if (fixedPrice)
        {return accumulator + Number(fixedPrice)}
        else {
          const hourlyRate = t(job, "ipfs.budget.hourlyRate").safeObject
          const totalHours = t(job, "ipfs.budget.totalHours").safeObject
          return accumulator + (Number(hourlyRate) * Number(totalHours))
        }
      }
      else
      {return accumulator}
    }
    return jobs.list.reduce(reducer, 0)
  }
)

export const monthWorkerEraningSelector = (workerId) => createSelector(
  jobsSelector(),
  (jobs) => {
    const reducer = (accumulator, job) => {
      const jobStateIndex = t(job, "state.index").safeObject
      const entryMonth = checkEntryDateToLastMonth(getJobEndDate(job))

      if (job.worker === workerId && paidFinishIndexes.includes(jobStateIndex) && entryMonth) {
        const fixedPrice = t(job, "ipfs.budget.fixedPrice").safeObject
        if (fixedPrice)
        {return accumulator + Number(fixedPrice)}
        else {
          const hourlyRate = t(job, "ipfs.budget.hourlyRate").safeObject
          const totalHours = t(job, "ipfs.budget.totalHours").safeObject
          return accumulator + (Number(hourlyRate) * Number(totalHours))
        }
      }
      else
      {return accumulator}
    }
    return jobs.list.reduce(reducer, 0)
  }
)

export const finishedJobsByWorkerSelector = (workerId) => createSelector(
  jobsSelector(),
  (jobs) => {
    return jobs.list.filter((job) => {
      return job.worker === workerId && JOB_STATE_FINISHED.index === t(job, "state.index").safeObject
    })
  }
)

export const finalizedJobsByWorkerSelector = (workerId) => createSelector(
  jobsSelector(),
  (jobs) => {
    return jobs.list.filter((job) => {
      return job.worker === workerId && JOB_STATE_PENDING_FINISH.index === t(job, "state.index").safeObject
    })
  }
)

export const pendingFinishJobsByWorkerSelector = (workerId) => createSelector(
  jobsSelector(),
  (jobs) => {
    return jobs.list.filter((job) => {
      return job.worker === workerId && JOB_STATE_FINALIZED.index === t(job, "state.index").safeObject
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
