import { daoByType } from '../daos/selectors'
// import { reloadPublicProfiles } from '../profiles/actions'

export const APPLICANTS_CLEAR = 'applicants/clear'
export const APPLICANTS_SAVE = 'applicants/save'

// Should be called only once
export const initJobApplicants = () => async (/*dispatch, getState*/) => {
  // const state = getState()
  // TODO aevalyakin subscribe one events here
}

export const reloadJobsApplicants = ({ jobId }) => async (dispatch, getState) => {
  const state = getState()
  console.log('reloadJobsApplicants', jobId)
  const jobDataProviderDAO = daoByType('JobsDataProvider')(state)
  const applicants = await jobDataProviderDAO.getJobOffers(jobId)
  console.log('applicants', applicants)
  // dispatch(reloadPublicProfiles(applicants.map(a => a.worker)))
  dispatch({ type: APPLICANTS_SAVE, jobId, applicants })
}
