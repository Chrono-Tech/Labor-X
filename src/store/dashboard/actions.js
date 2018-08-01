import * as backendApi from 'src/api/backend'
import { userTokenSelector, daoByType } from 'src/store'

export const GET_PAGE_DATA_REQUEST = 'DASHBOARD/GET_PAGE_DATA/REQUEST'
export const GET_PAGE_DATA_SUCCESS = 'DASHBOARD/GET_PAGE_DATA/SUCCESS'
export const GET_PAGE_DATA_FAILURE = 'DASHBOARD/GET_PAGE_DATA/FAILURE'
export const getPageDataRequest = (req) => ({ type: GET_PAGE_DATA_REQUEST, payload: req })
export const getPageDataSuccess = (res) => ({ type: GET_PAGE_DATA_SUCCESS, payload: res })
export const getPageDataFailure = (err) => ({ type: GET_PAGE_DATA_FAILURE, payload: err })
export const getPageData = () => async (dispatch, getState) => {
  try {
    dispatch(getPageDataRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.getDashboardData(token)
    dispatch(getPageDataSuccess({ profile }))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    dispatch(getPageDataFailure(err))
  }
}

export const GET_WORKER_TODO_JOBS_REQUEST = 'DASHBOARD/GET_WORKER_TODO_JOBS/REQUEST'
export const GET_WORKER_TODO_JOBS_SUCCESS = 'DASHBOARD/GET_WORKER_TODO_JOBS/SUCCESS'
export const GET_WORKER_TODO_JOBS_FAILURE = 'DASHBOARD/GET_WORKER_TODO_JOBS/FAILURE'
export const getWorkerTodoJobsRequest = (req) => ({ type: GET_WORKER_TODO_JOBS_REQUEST, payload: req })
export const getWorkerTodoJobsSuccess = (res) => ({ type: GET_WORKER_TODO_JOBS_SUCCESS, payload: res })
export const getWorkerTodoJobsFailure = (err) => ({ type: GET_WORKER_TODO_JOBS_FAILURE, payload: err })

export const getWorkerTodoJobs = (address) => async (dispatch, getState) => {
  try {
    dispatch(getWorkerTodoJobsRequest())
    const JobsDataProvider = daoByType('JobsDataProvider')(getState())
    const jobs = await JobsDataProvider.getJobsForWorker(address)
    dispatch(getWorkerTodoJobsSuccess(jobs))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    dispatch(getWorkerTodoJobsFailure(err))
  }
}
