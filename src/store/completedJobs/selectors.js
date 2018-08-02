import { createSelector } from "reselect"
import moment from "moment";
import get from "lodash/get";
import { JOB_STATE_OFFER_ACCEPTED, JOB_STATE_PENDING_START, JOB_STATE_FINISHED, JOB_STATE_PENDING_FINISH, JOB_STATE_FINALIZED } from "../../models"
import { signerSelector } from 'src/store/wallet/selectors'

const finishedIndexes = [JOB_STATE_FINISHED.index, JOB_STATE_PENDING_FINISH.index, JOB_STATE_FINALIZED.index]
const paidFinishIndexes = [JOB_STATE_FINISHED.index, JOB_STATE_FINALIZED.index]

export const getState = state => state.completedJobs

export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)

export const jobsSelector = (state) => state.completedJobs.jobs

const getJobEndDate = (job) => {
  const jobStateIndex = get(job, "state.index")
  if (jobStateIndex === JOB_STATE_FINISHED.index) return moment(get(job, "extra.finishTime"))
  if (jobStateIndex === JOB_STATE_FINALIZED.index) return moment(get(job, "extra.finalizedAt"))
  return moment().add('years', 5)
}

const checkEntryDateToLastMonth = (date) => {
  const nowSubtractMonth = moment().subtract(1, 'months')
  return date.isBetween(nowSubtractMonth, moment())
}

export const countFinishedJobsByWorkerSelector = createSelector(
    [ jobsSelector ],
    (jobs) => {
      const reducer = (accumulator, job) => {
        const jobStateIndex = get(job, "state.index")
        if (finishedIndexes.includes(jobStateIndex)) {
            return accumulator + 1
        } else {
            return accumulator
        }
        
      }
      return jobs.reduce(reducer, 0)
    }
  )
  
  export const totalWorkerEraningSelector = createSelector(
    [ jobsSelector ],
    (jobs) => {
      const reducer = (accumulator, job) => {
        const jobStateIndex = get(job, "state.index")
        if (finishedIndexes.includes(jobStateIndex)) {
          const fixedPrice = get(job, "ipfs.budget.fixedPrice")
          if (fixedPrice) {
            return accumulator + Number(fixedPrice)
          } else {
            const hourlyRate = get(job, "ipfs.budget.hourlyRate")
            const totalHours = get(job, "ipfs.budget.totalHours")
            return accumulator + (Number(hourlyRate) * Number(totalHours))
          }
        } else {
            return accumulator
        }
      }
      return jobs.reduce(reducer, 0)
    }
  )
  
  export const monthWorkerEraningSelector = createSelector(
    [ jobsSelector ],
    (jobs) => {
      const reducer = (accumulator, job) => {
        const jobStateIndex = get(job, "state.index")
        const entryMonth = checkEntryDateToLastMonth(getJobEndDate(job))
        if (paidFinishIndexes.includes(jobStateIndex) && entryMonth) {
            const fixedPrice = get(job, "ipfs.budget.fixedPrice")
            if (fixedPrice) {
                return accumulator + Number(fixedPrice)
            } else {
                const hourlyRate = get(job, "ipfs.budget.hourlyRate")
                const totalHours = get(job, "ipfs.budget.totalHours")
                return accumulator + (Number(hourlyRate) * Number(totalHours))
            }
        } else {
            return accumulator
        }
      }
      return jobs.reduce(reducer, 0)
    }
  )
  
  export const finishedJobsByWorkerSelector = createSelector(
    [ jobsSelector ],
    (jobs) => {
      return jobs.filter((job) => {
        return JOB_STATE_FINISHED.index === get(job, "state.index")
      })
    }
  )
  
  export const finalizedJobsByWorkerSelector = createSelector(
    [ jobsSelector ],
    (jobs) => {
      return jobs.filter((job) => {
        return JOB_STATE_PENDING_FINISH.index === get(job, "state.index")
      })
    }
  )
  
  export const pendingFinishJobsByWorkerSelector = createSelector(
    [ jobsSelector ],
    (jobs) => {
      return jobs.filter((job) => {
        return JOB_STATE_FINALIZED.index === get(job, "state.index")
      })
    }
  )