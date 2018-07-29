import faker from 'faker'

import { currentAddressSelector } from "src/store"
import {daoByType} from "src/store";
import * as profileApi from 'src/api/backend'
import {
  JOB_STATE_OFFER_ACCEPTED, JOB_STATE_PENDING_FINISH, JOB_STATE_PENDING_START,
  JOB_STATE_STARTED
} from "../../models";

export const SELECT_INITIAL_PROPS_REQUEST = 'ACTIVE_JOBS/SELECT_INITIAL_PROPS_REQUEST'
export const SELECT_INITIAL_PROPS_SUCCESS = 'ACTIVE_JOBS/SELECT_INITIAL_PROPS_SUCCESS'
export const SELECT_INITIAL_PROPS_FAILURE = 'ACTIVE_JOBS/SELECT_INITIAL_PROPS_FAILURE'
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
    const userJobs = jobs.filter((x) => x.client.toLowerCase() === userAddress.toLowerCase())
    const activeJobs = userJobs.filter((x) => (
      x.state === JOB_STATE_OFFER_ACCEPTED ||
      x.state === JOB_STATE_PENDING_START ||
      x.state === JOB_STATE_STARTED ||
      x.state === JOB_STATE_PENDING_FINISH
    ))
    const workerAddresses = activeJobs.map((x) => x.worker)
    const workerPersons = await profileApi.getPersons(workerAddresses)
    const cards = activeJobs.map((x, i) => ({
      job: x,
      workerPerson: {
        ...({
          avatar: faker.internet.avatar(),
          userName: `${faker.name.firstName()} ${faker.name.lastName()}`
        }),
        ...(workerPersons.find((workerPerson) => workerPerson.address.toLowerCase() === x.worker.toLowerCase()) || {})
      }
    }))
    dispatch(selectInitialPropsSuccess({ cards }))
  } catch (err) {
    dispatch(selectInitialPropsFailure(err))
  }
}
