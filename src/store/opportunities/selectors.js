import { createSelector } from 'reselect'
import { jobsListSelector, boardsSelector } from 'src/store/index'
import { SEARCH_INPUT_NAME } from 'src/content/lib/OpportunitiesContent/OpportunitiesContent'
import { JOB_STATE_CREATED } from 'src/models'

export const ALLOWED_STATES = [ JOB_STATE_CREATED ]

export const opportunitiesFilteredListSelector = (filterFields = {}) => createSelector(
  jobsListSelector(), boardsSelector(),
  (jobList, boards) => {

    const filterText = filterFields.hasOwnProperty(SEARCH_INPUT_NAME) ? String(filterFields[SEARCH_INPUT_NAME]).toLowerCase() : ''

    return jobList
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
  }
)
