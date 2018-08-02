import { currentAddressSelector } from "src/store"
import {daoByType} from "src/store";
import * as profileApi from 'src/api/backend'

export const SELECT_INITIAL_PROPS_REQUEST = 'COMPLETED_JOBS/SELECT_INITIAL_PROPS/REQUEST'
export const SELECT_INITIAL_PROPS_SUCCESS = 'COMPLETED_JOBS/SELECT_INITIAL_PROPS/SUCCESS'
export const SELECT_INITIAL_PROPS_FAILURE = 'COMPLETED_JOBS/SELECT_INITIAL_PROPS/FAILURE'
export const selectInitialPropsRequest = (req) => ({ type: SELECT_INITIAL_PROPS_REQUEST, payload: req })
export const selectInitialPropsSuccess = (res) => ({ type: SELECT_INITIAL_PROPS_SUCCESS, payload: res })
export const selectInitialPropsFailure = (err) => ({ type: SELECT_INITIAL_PROPS_FAILURE, payload: err })
export const selectInitialProps = () => async (dispatch, getState) => {
  try {
    dispatch(selectInitialPropsRequest())
    const state = getState()
    const JobsDataProvider = daoByType('JobsDataProvider')(state)
    const BoardController = daoByType('BoardController')(state)
    const userAddress = currentAddressSelector()(state)
    const jobs = (await JobsDataProvider.getJobs(BoardController)).filter((x) => x.boardId)
    const userJobs = jobs.filter((x) => (x.worker && x.worker.toLowerCase()) === userAddress.toLowerCase())
    dispatch(selectInitialPropsSuccess({ jobs: userJobs }))
  } catch (err) {
    dispatch(selectInitialPropsFailure(err))
  }
}
