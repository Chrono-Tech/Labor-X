import { daoByType } from '../daos/selectors'

export const OFFERS_CLEAR = 'offers/clear'
export const OFFERS_SAVE = 'offers/save'

// Should be called only once
export const initJobOffers = () => async (/*dispatch, getState*/) => {
  // const state = getState()
  // TODO aevalyakin subscribe on events here
}

export const reloadJobsOffers = ({ jobId }) => async (dispatch, getState) => {
  const state = getState()
  const jobDataProviderDAO = daoByType('JobsDataProvider')(state)
  const offers = await jobDataProviderDAO.getJobOffers(jobId)
  dispatch({ type: OFFERS_SAVE, jobId, offers })
}
