import { daoByType } from '../daos/selectors'
import { workerProfile } from '../review-applicants/actions'

export const OFFERS_CLEAR = 'offers/clear'
export const OFFERS_SAVE = 'offers/save'

// Should be called only once
export const initJobOffers = () => async () => {
  // await dispatch(reloadJobsOffers())
}

export const reloadJobsOffers = (id) => async (dispatch, getState) => {
  const state = getState()
  const jobDataProviderDAO = daoByType('JobsDataProvider')(state)
  const offers = await jobDataProviderDAO.getJobOffers(id)
  const applicantsAdresses = offers
    ? offers.map(item => item.wallet)
    : []
  applicantsAdresses.forEach((addrees) => dispatch(workerProfile(addrees)))
  dispatch({ type: OFFERS_SAVE, jobId: id, offers })

  // if (state.jobs && state.jobs.list) {
  //   for (let job of state.jobs.list) {
  //     if (job.state === JOB_STATE_CREATED)
  //     {setTimeout(async () => {
  //       const offers = await jobDataProviderDAO.getJobOffers(job.id)
  //       //Filtering only my offers
  //       if (offers.length > 0) {
  //         dispatch({ type: OFFERS_SAVE, jobId: job.id, offers })
  //       }
  //     }, 0)}
  //   }
  // }
}
