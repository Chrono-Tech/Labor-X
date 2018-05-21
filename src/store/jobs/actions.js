import { storeIntoIPFS } from 'src/utils'
import { JobModel, JobPostedEvent, JobCanceledEvent, JobPostFormModel } from 'src/models'
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
  const jobControlerDAO = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  dispatch({
    type: JOBS_CLEAR,
  })
  if (signer) {
    const jobs = await jobControlerDAO.getJobs(signer.address)
    for (const job of jobs) {
      dispatch({
        type: JOBS_SAVE,
        job,
      })
    }
  }
}

export const handleJobPosted = (e: JobPostedEvent) => async (dispatch, getState): JobModel => {
  const state = getState()
  const jobControlerDAO = daoByType('JobController')(state)
  const job = await jobControlerDAO.getJobById(e.jobId)
  dispatch({
    type: JOBS_SAVE,
    job,
  })
  return job
}

export const handleJobCanceled = (e: JobCanceledEvent) => async (/*dispatch, getState*/) => {
  // TODO @ipavlenko: Implement
  // eslint-disable-next-line no-console
  console.log('jobs/handleJobCanceled', e)
}

export const createJob = (job: JobPostFormModel) => async (dispatch, getState) => {
  const state = getState()
  const jobControlerDAO = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)
  // eslint-disable-next-line no-console
  console.log('[jobs] createJob from values', job)

  const detailsIPFSHash = await storeIntoIPFS(job.ipfsData)
  const tx = jobControlerDAO.createPostJobTx(signer.address, job.areaNumber, job.categoryNumber, job.skillsNumber, detailsIPFSHash)
  await dispatch(executeTransaction({ tx, web3 }))
}
