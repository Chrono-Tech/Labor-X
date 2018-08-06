import * as backendApi from 'src/api/backend'
import { JOB_STATE_OFFER_ACCEPTED, JOB_STATE_PENDING_START, JOB_STATE_STARTED } from 'src/models'
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

export const GET_WORKER_TODO_JOBS_SUCCESS = 'DASHBOARD/GET_WORKER_TODO_JOBS/SUCCESS'
export const getWorkerTodoJobsSuccess = (res) => ({ type: GET_WORKER_TODO_JOBS_SUCCESS, payload: res })

export const getWorkerTodoJobs = (address) => async (dispatch, getState) => {
  try {
    const state = getState()
    const JobsDataProvider = daoByType('JobsDataProvider')(state)
    const BoardController = daoByType('BoardController')(state)
    // TODO @aevalyakin use JobsDataProvider.getJobsForWorker when fixed in smartcontract
    const jobs = await JobsDataProvider.getJobs(BoardController)
    const jobsForWorker = jobs.filter(job => job.worker === address)
    const workerTodoJobs = jobsForWorker.filter(job =>
      job.state === JOB_STATE_STARTED ||
      job.state === JOB_STATE_OFFER_ACCEPTED ||
      job.state === JOB_STATE_PENDING_START
    )
    dispatch(getWorkerTodoJobsSuccess(workerTodoJobs))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

export const GET_CLIENT_TODO_JOBS_SUCCESS = 'DASHBOARD/GET_CLIENT_TODO_JOBS/SUCCESS'
export const getClientTodoJobsSuccess = (res) => ({ type: GET_CLIENT_TODO_JOBS_SUCCESS, payload: res })

export const getClientTodoJobs = (address) => async (dispatch, getState) => {
  try {
    const state = getState()
    const JobsDataProvider = daoByType('JobsDataProvider')(state)
    const BoardController = daoByType('BoardController')(state)
    // TODO @aevalyakin use JobsDataProvider.getJobsForClient when fixed in smartcontract
    const jobs = await JobsDataProvider.getJobs(BoardController)
    const jobsForClient = jobs.filter(job => job.client === address)
    const clientTodoJobs = jobsForClient.filter(job =>
      job.state === JOB_STATE_STARTED ||
      job.state === JOB_STATE_OFFER_ACCEPTED ||
      job.state === JOB_STATE_PENDING_START
    )
    dispatch(getClientTodoJobsSuccess(clientTodoJobs))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

export const GET_RECRUITER_BOARDS_SUCCESS = 'DASHBOARD/GET_RECRUITER_BOARDS/SUCCESS'
export const getRecruiterBoardsSuccess = (res) => ({ type: GET_RECRUITER_BOARDS_SUCCESS, payload: res })

export const getRecruiterBoardsJobs = (address) => async (dispatch, getState) => {
  try {
    const state = getState()
    const BoardController = daoByType('BoardController')(state)
    // TODO @aevalyakin use BoardController.getBoardsForUser when fixed in smartcontract
    const boards = await BoardController.getBoards(address)
    const recruiterJobs = boards.filter(board => board.creator.toLowerCase() === address.toLowerCase())
    dispatch(getRecruiterBoardsSuccess(recruiterJobs))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}
