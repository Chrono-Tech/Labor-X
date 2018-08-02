import { currentAddressSelector } from "src/store"
import { daoByType } from "src/store";
import { JOB_STATE_FINISHED, JOB_STATE_FINALIZED } from 'src/models'
import * as profileApi from 'src/api/backend'

export const SELECT_INITIAL_PROPS_REQUEST = 'ARCHIVE_JOBS/SELECT_INITIAL_PROPS/REQUEST'
export const SELECT_INITIAL_PROPS_SUCCESS = 'ARCHIVE_JOBS/SELECT_INITIAL_PROPS/SUCCESS'
export const SELECT_INITIAL_PROPS_FAILURE = 'ARCHIVE_JOBS/SELECT_INITIAL_PROPS/FAILURE'
export const selectInitialPropsRequest = (req) => ({ type: SELECT_INITIAL_PROPS_REQUEST, payload: req })
export const selectInitialPropsSuccess = (res) => ({ type: SELECT_INITIAL_PROPS_SUCCESS, payload: res })
export const selectInitialPropsFailure = (err) => ({ type: SELECT_INITIAL_PROPS_FAILURE, payload: err })
export const selectInitialProps = () => async (dispatch, getState) => {
  try {
    dispatch(selectInitialPropsRequest())
    const allowedStatuses = [JOB_STATE_FINISHED, JOB_STATE_FINALIZED]
    const state = getState()
    const JobsDataProvider = daoByType('JobsDataProvider')(state)
    const BoardController = daoByType('BoardController')(state)
    const userAddress = currentAddressSelector()(state)
    const jobs = (await JobsDataProvider.getJobs(BoardController)).filter((x) => x.boardId)
    const boards = await BoardController.getBoards(userAddress)
    const clientJobs = jobs.filter((x) => x.client.toLowerCase() === userAddress.toLowerCase())
    const clientArchiveJobs = clientJobs.filter((x) => allowedStatuses.includes(x.state))

    const workerAddresses = clientArchiveJobs.map((x) => x.worker)
    const workerPersons = await profileApi.getPersons(workerAddresses)

    const cards = clientArchiveJobs
      .map(job => ({
        job,
        board: boards.find((board) => board.id === job.boardId),
        worker: workerPersons.find((x) => job.worker.toLowerCase() === x.address.toLowerCase()),
      }))

    dispatch(selectInitialPropsSuccess({ cards }))
  } catch (err) {
    dispatch(selectInitialPropsFailure(err))
  }
}
