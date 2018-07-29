import { currentAddressSelector } from "src/store"
import {daoByType} from "src/store";
import * as profileApi from 'src/api/backend'

export const SELECT_INITIAL_PROPS_REQUEST = 'POSTED_JOBS/SELECT_INITIAL_PROPS/REQUEST'
export const SELECT_INITIAL_PROPS_SUCCESS = 'POSTED_JOBS/SELECT_INITIAL_PROPS/SUCCESS'
export const SELECT_INITIAL_PROPS_FAILURE = 'POSTED_JOBS/SELECT_INITIAL_PROPS/FAILURE'
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
    const jobs = await JobsDataProvider.getJobs(BoardController)
    const boards = await BoardController.getBoards(userAddress)
    const userJobs = jobs.filter((x) => x.client.toLowerCase() === userAddress.toLowerCase())
    const jobOffers = await Promise.all(userJobs.map((x) => JobsDataProvider.getJobOffers(x.id)))
    const workerAddresses = jobOffers.reduce((result, x) => result.concat(x), []).map((x) => x.worker)
    const workerPersons = await profileApi.getPersons(workerAddresses)
    const cards = userJobs.map((x, i) => ({
      job: x,
      board: boards.find((board) => board.id === x.boardId),
      offers: jobOffers[i].map((offer) => ({ ...offer, workerPerson: workerPersons.find((x) => offer.worker.toLowerCase() === x.address.toLowerCase()) }))
    }))
    dispatch(selectInitialPropsSuccess({ cards }))
  } catch (err) {
    dispatch(selectInitialPropsFailure(err))
  }
}
