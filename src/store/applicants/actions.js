import { daoByType } from '../daos/selectors'

export const APPLICANTS_CLEAR = 'applicants/clear'
export const APPLICANTS_SAVE = 'applicants/save'

// Should be called only once
export const initJobApplicants = () => async (/*dispatch, getState*/) => {
  // const state = getState()
  // TODO aevalyakin subscribe on events here
}

export const reloadJobsApplicants = ({ jobId }) => async (dispatch, getState) => {
  const state = getState()
  const jobDataProviderDAO = daoByType('JobsDataProvider')(state)
  const applicants = await jobDataProviderDAO.getJobOffers(jobId)
  dispatch({ type: APPLICANTS_SAVE, jobId, applicants })
}
