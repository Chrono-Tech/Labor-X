import {daoByType} from "src/store";
import * as backendApi from "../../api/backend"


export const SELECT_INITIAL_PROPS_REQUEST = 'REVIEW_APPLICANTS/SELECT_INITIAL_PROPS/REQUEST'
export const SELECT_INITIAL_PROPS_SUCCESS = 'REVIEW_APPLICANTS/SELECT_INITIAL_PROPS/SUCCESS'
export const SELECT_INITIAL_PROPS_FAILURE = 'REVIEW_APPLICANTS/SELECT_INITIAL_PROPS/FAILURE'
export const selectInitialPropsRequest = (req) => ({ type: SELECT_INITIAL_PROPS_REQUEST, payload: req })
export const selectInitialPropsSuccess = (res) => ({ type: SELECT_INITIAL_PROPS_SUCCESS, payload: res })
export const selectInitialPropsFailure = (err) => ({ type: SELECT_INITIAL_PROPS_FAILURE, payload: err })
export const selectInitialProps = (id) => async (dispatch, getState) => {
  try {
    dispatch(selectInitialPropsRequest())
    const state = getState()
    const JobsDataProvider = daoByType('JobsDataProvider')(state)
    const BoardController = daoByType('BoardController')(state)
    const jobs = await JobsDataProvider.getJobs(BoardController)
    const job = jobs.find((x) => parseInt(x.id) === (parseInt(id)))
    const jobOffers = await JobsDataProvider.getJobOffers(job.id)
    let applicants = []
    for (let i = 0; i < jobOffers.length; i++) {
      const offer = jobOffers[i];
      const person = await backendApi.getPerson(offer.worker)
      // const workerProfile = offer.worker ? await backendApi.getWorker(offer.worker) : {};
      applicants.push({
        offer,
        person,
        // workerProfile,
      });
    }
    dispatch(selectInitialPropsSuccess({ applicants, job }))
  } catch (err) {
    dispatch(selectInitialPropsFailure(err))
  }
}
