import t from "typy"
import { createSelector } from 'reselect'
import { jobsListSelector, boardsSelector } from 'src/store/index'
import { SEARCH_INPUT_NAME } from 'src/content/lib/OpportunitiesContent/OpportunitiesContent'
import { JOB_STATE_CREATED, FILTER_BY_DATE, FILTER_BY_BUDGET, FILTER_BY_HOURLY_RATE, FILTER_BY_RATING } from 'src/models'

export const ALLOWED_STATES = [JOB_STATE_CREATED]

export const opportunitiesFilteredListSelector = (filterFields = {}) => createSelector(
  jobsListSelector(), boardsSelector(),
  (jobList_, boards) => {

    const filterText = filterFields.hasOwnProperty(SEARCH_INPUT_NAME) ? String(filterFields[SEARCH_INPUT_NAME]).toLowerCase() : ''
    //Apply filters
    let filteredJobList = jobList_
      .filter(job => !!ALLOWED_STATES.find(state => job.state === state))
      .filter(job => [job.ipfs.name, job.ipfs.conclusion].some((field) => {
        return (new RegExp(filterText, 'gi')).test(field)
      }))
      .map(job => {
        return {
          job,
          board: boards.byKey[`board-${job.boardId}`],
        }
      })
    //Apply sorting
    let sortedJobList
    switch (Number(filterFields.sort_by)) {
      case FILTER_BY_DATE.index:
        sortedJobList = filteredJobList
          .sort((a, b) => {
            const firstTime = t(a, "job.extra.createdAt").safeObject.getTime()
            const secondTime = t(b, "job.extra.createdAt").safeObject.getTime()
            return firstTime - secondTime
          })
        break
      case FILTER_BY_BUDGET.index:
        sortedJobList = filteredJobList
          .sort((a, b) => {
            const aFixedPrice = Number(t(a, "job.ipfs.budget.fixedPrice").safeObject)
            const aHourlyRate = Number(t(a, "job.ipfs.budget.hourlyRate").safeObject)
            const aTotalHours = Number(t(a, "job.ipfs.budget.totalHours").safeObject)
            const bFixedPrice = Number(t(b, "job.ipfs.budget.fixedPrice").safeObject)
            const bHourlyRate = Number(t(b, "job.ipfs.budget.hourlyRate").safeObject)
            const bTotalHours = Number(t(b, "job.ipfs.budget.totalHours").safeObject)

            const aBudget = aFixedPrice ? aFixedPrice : aHourlyRate *  aTotalHours
            const bBudget = bFixedPrice ? bFixedPrice : bHourlyRate * bTotalHours
            return  aBudget - bBudget
          })
        break
      case FILTER_BY_HOURLY_RATE.index:

        break
      case FILTER_BY_RATING.index:

        break
      default:
        sortedJobList = filteredJobList
    }
    return sortedJobList
  }
)
