import { storeIntoIPFS } from 'src/utils'
import { JobModel, JobPostedEvent, JobCanceledEvent, JobFormModel, JobOfferFormModel, SkillModel } from 'src/models'
import { daoByType } from '../daos/selectors'
import { signerSelector } from '../wallet/selectors'
import { executeTransaction } from '../ethereum/actions'
import { web3Selector } from '../ethereum/selectors'

export const JOBS_CLEAR = 'jobs/clear'
export const JOBS_SAVE = 'jobs/save'

// Sholud be called only once
export const initJobs = () => async (dispatch, getState) => {
  const state = getState()
  daoByType('JobController')(state)
    .on('JobPosted', ({ event }) => dispatch(handleJobPosted(event)))
    .on('JobCanceled', ({ event }) => dispatch(handleJobCanceled(event)))
  await dispatch(reloadJobs())
}

export const reloadJobs = () => async (dispatch, getState) => {
  const state = getState()
  const jobControllerDAO = daoByType('JobController')(state)
  const boardControlerDAO = daoByType('BoardController')(state)
  const signer = signerSelector()(state)
  dispatch({
    type: JOBS_CLEAR,
  })
  if (signer) {
    const jobs = await jobControllerDAO.getJobs(boardControlerDAO, signer.address)
    dispatch({ type: JOBS_SAVE, jobs })
  }
}

export const handleJobPosted = (e: JobPostedEvent) => async (dispatch, getState): JobModel => {
  // eslint-disable-next-line no-console
  console.log('jobs/handleJobPosted', e)
  const state = getState()
  const jobControllerDAO = daoByType('JobController')(state)
  const boardControlerDAO = daoByType('BoardController')(state)
  const job = await jobControllerDAO.getJobById(boardControlerDAO, e.jobId)
  dispatch({
    type: JOBS_SAVE,
    jobs: [ job ],
  })
  return job
}

export const handleJobCanceled = (e: JobCanceledEvent) => async (/*dispatch, getState*/) => {
  // TODO @ipavlenko: Implement
  // eslint-disable-next-line no-console
  console.log('jobs/handleJobCanceled', e)
}

export const createJob = (form: JobFormModel) => async (dispatch, getState) => {
  // eslint-disable-next-line no-console
  console.log('[jobs] createJob from values', form)
  const state = getState()
  const jobControllerDAO = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)

  const detailsIPFSHash = await storeIntoIPFS(form.ipfs)

  const tx = jobControllerDAO.createPostJobTx(
    signer.address,
    form.area.code,
    form.category.code,
    SkillModel.writeArrayToMask(form.skills),
    detailsIPFSHash
  )
  await dispatch(executeTransaction({ tx, web3 }))
}

export const createJobOffer = (form: JobOfferFormModel) => async (dispatch, getState) => {
  // eslint-disable-next-line no-console
  console.log('[jobs] createJobOffer from values', form)
  const state = getState()
  const jobControllerDAO = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)

  const tx = jobControllerDAO.createPostJobOfferTx(
    signer.address,
    form.jobId,
    form.rate,
    form.estimate,
    form.ontop
  )
  await dispatch(executeTransaction({ tx, web3 }))
}
