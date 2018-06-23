import { storeIntoIPFS } from 'src/utils'
import {
  JobModel,
  JobConfirmEndWorkEvent,
  JobPostedEvent,
  JobPausedEvent,
  JobResumedEvent,
  JobCanceledEvent,
  JobFormModel,
  JobOfferFormModel,
  SkillModel,
} from 'src/models'
import { daoByType } from '../daos/selectors'
import { signerSelector } from '../wallet/selectors'
import { executeTransaction } from '../ethereum/actions'
import { web3Selector } from '../ethereum/selectors'

export const JOBS_CLEAR = 'jobs/clear'
export const JOBS_SAVE = 'jobs/save'
export const JOBS_CLIENT_SAVE = 'jobs/client_save'
export const JOBS_WORKER_SAVE = 'jobs/worker_save'
export const JOBS_FILTER = 'jobs/filter'

export const refreshJob = (jobId: Number) => async (dispatch, getState) => {
  // eslint-disable-next-line no-console
  console.log('refreshJob: ', jobId)
  const state = getState()
  const jobsDataProviderDAO = daoByType('JobsDataProvider')(state)
  const boardControlerDAO = daoByType('BoardController')(state)
  const job = await jobsDataProviderDAO.getJobById(boardControlerDAO, jobId)
  dispatch({
    type: JOBS_WORKER_SAVE,
    jobList: [ job ],
  })
  return job
}

// Should be called only once
export const initJobs = () => async (dispatch, getState) => {
  const state = getState()
  daoByType('JobController')(state)
    .on('JobPosted', ({ event }) => dispatch(handleJobPosted(event)))
    .on('JobCanceled', ({ event }) => dispatch(handleJobCanceled(event)))
    .on('JobPaused', ({ event }) => dispatch(handleJobPaused(event)))
    .on('JobResumed', ({ event }) => dispatch(handleJobResumed(event)))
    .on('JobConfirmEndWork', ({ event }) => dispatch(handleJobConfirmEndWork(event)))
    .on('JobCanceled', ({ event }) => dispatch(handleJobCanceled(event)))
  await dispatch(reloadJobs())
}

export const reloadJobs = () => async (dispatch, getState) => {

  const state = getState()

  const boardControlerDAO = daoByType('BoardController')(state)
  const JobDataProviderDAO = daoByType('JobsDataProvider')(state)
  dispatch({ type: JOBS_CLEAR })

  const jobs = await JobDataProviderDAO.getJobs(boardControlerDAO)
  dispatch({ type: JOBS_SAVE, jobList: jobs })

  // TODO return after getJobs methods full search implement

  // const user = userSelector()(state)
  // const signer = signerSelector()(state)
  //
  // if (user.accountTypes.worker) {
  //   const jobs = await JobDataProviderDAO.getJobsForWorker(signer.address)
  //   dispatch({ type: JOBS_WORKER_SAVE, jobList: jobs })
  // }
  //
  // if (user.accountTypes.client) {
  //   const jobs = await JobDataProviderDAO.getJobsForClient(signer.address)
  //   dispatch({ type: JOBS_CLIENT_SAVE, jobList: jobs })
  // }

}

export const handleJobPaused = (e: JobPausedEvent) => async (dispatch, getState) => {
  // eslint-disable-next-line no-console
  console.log('handleJobPaused', e)
  const state = getState()
  const jobsDataProviderDAO = daoByType('JobsDataProvider')(state)
  const boardControlerDAO = daoByType('BoardController')(state)
  const job = await jobsDataProviderDAO.getJobById(boardControlerDAO, e.jobId)
  dispatch({
    type: JOBS_WORKER_SAVE,
    jobList: [ job ],
  })
  return job
}

export const handleJobResumed = (e: JobResumedEvent) => async (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('handleJobPaused', e)
  dispatch(refreshJob(e.jobId))
}

export const handleJobPosted = (e: JobPostedEvent) => async (dispatch): JobModel => {
  // eslint-disable-next-line no-console
  console.log('jobs/handleJobPosted', e)
  dispatch(refreshJob(e.jobId))
}

export const handleJobCanceled = (e: JobCanceledEvent) => async (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('jobs/handleJobCanceled', e)
  dispatch(refreshJob(e.jobId))
}

export const handleJobConfirmEndWork = (e: JobConfirmEndWorkEvent) => async (dispatch) => {
  // eslint-disable-next-line no-console
  console.log('jobs/handleJobConfirmEndWork', e)
  dispatch(refreshJob(e.jobId))
}

export const resumeJobWork = (jobId: Number) => async (dispatch, getState) => {
  const state = getState()
  const jobControllerDAO = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)

  const tx = jobControllerDAO.createResumeJobWorkTx(
    signer.address,
    jobId
  )
  await dispatch(executeTransaction({ tx, web3, signer }))
}

export const pauseJobWork = (jobId: Number) => async (dispatch, getState) => {
  const state = getState()
  const jobControllerDAO = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)

  const tx = jobControllerDAO.createPauseJobWorkTx(
    signer.address,
    jobId
  )
  await dispatch(executeTransaction({ tx, web3, signer }))
}

export const cancelJob = (jobId: Number) => async (dispatch, getState) => {
  const state = getState()
  const jobsController = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  await jobsController.cancelJob(signer.address, jobId)
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
    form.flowType,
    form.area.code,
    form.category.code,
    SkillModel.writeArrayToMask(form.skills),
    0, // defaultPay todo check what this parameter is for and mark up field on create job form
    detailsIPFSHash
  )
  await dispatch(executeTransaction({ tx, web3, signer }))
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
  await dispatch(executeTransaction({ tx, web3, signer }))
}

export const updateFilterJobs = (filterFields) => (dispatch, getState) => {
  const state = getState()

  const { list } = state.jobs

  let { searchText } = filterFields
  let currentList = [...list] || []

  if (searchText){
    searchText = String(searchText).toLowerCase()
    currentList = currentList.filter((job) => (String(job.ipfs.name || '').toLowerCase().includes(searchText)))
  }

  dispatch({
    type: JOBS_FILTER,
    jobsList: currentList,
  })
}

export const GET_BY_ID_REQUEST = 'GET_BY_ID_REQUEST'
export const GET_BY_ID_SUCCESS = 'GET_BY_ID_SUCCESS'
export const GET_BY_ID_FAILURE = 'GET_BY_ID_FAILURE'

const getByIdRequest = (req) => ({ type: GET_BY_ID_REQUEST, req })
const getByIdSuccess = (res) => ({ type: GET_BY_ID_SUCCESS, res })
const getByIdFailure = (err) => ({ type: GET_BY_ID_FAILURE, err })

export const getById = (id) => async (dispatch, getState) => {
  try {
    dispatch(getByIdRequest({ id }))
    const state = getState()
    const JobsDataProvider = daoByType('JobsDataProvider')(state)
    const job = await JobsDataProvider.getJobById(null, id)
    dispatch(getByIdSuccess(job))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    dispatch(getByIdFailure(err))
  }
}

export const ACCEPT_OFFER_REQUEST = 'ACCEPT_OFFER_REQUEST'
export const ACCEPT_OFFER_SUCCESS = 'ACCEPT_OFFER_SUCCESS'
export const ACCEPT_OFFER_FAILURE = 'ACCEPT_OFFER_FAILURE'

const acceptOfferRequest = () => ({ type: ACCEPT_OFFER_REQUEST })
const acceptOfferSuccess = (res) => ({ type: ACCEPT_OFFER_SUCCESS, res })
const acceptOfferFailure = (err) => ({ type: ACCEPT_OFFER_FAILURE, err })

export const acceptOffer = (jobId, workerAddress) => async (dispatch, getState) => {
  try {
    dispatch(acceptOfferRequest())
    const state = getState()
    const JobController = daoByType('JobController')(state)
    const signer = signerSelector()(state)
    const web3 = web3Selector()(state)
    const calculatedLockAmountForWorker = await JobController.calculateLockAmountFor(workerAddress, jobId)
    const tx = await JobController.acceptOffer(signer.address, jobId, workerAddress, calculatedLockAmountForWorker)
    const res = await dispatch(executeTransaction({ tx, web3, signer }))
    dispatch(acceptOfferSuccess(res))
  } catch (err) {
    dispatch(acceptOfferFailure(err))
  }
}

export const START_WORK_REQUEST = 'START_WORK_REQUEST'
export const START_WORK_SUCCESS = 'START_WORK_SUCCESS'
export const START_WORK_FAILURE = 'START_WORK_FAILURE'

const startWorkRequest = () => ({ type: START_WORK_REQUEST })
const startWorkSuccess = (res) => ({ type: START_WORK_SUCCESS, res })
const startWorkFailure = (err) => ({ type: START_WORK_FAILURE, err })

export const startWork = (jobId: Number) => async (dispatch, getState) => {
  try {
    dispatch(startWorkRequest())
    const state = getState()
    const JobController = daoByType('JobController')(state)
    const signer = signerSelector()(state)
    const web3 = web3Selector()(state)
    const tx = await JobController.startWork(signer.address, jobId)
    const res = await dispatch(executeTransaction({ tx, web3, signer }))
    dispatch(startWorkSuccess(res))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    dispatch(startWorkFailure(err))
  }
}

export const CONFIRM_START_WORK_REQUEST = 'CONFIRM_START_WORK_REQUEST'
export const CONFIRM_START_WORK_SUCCESS = 'CONFIRM_START_WORK_SUCCESS'
export const CONFIRM_START_WORK_FAILURE = 'CONFIRM_START_WORK_FAILURE'

const confirmStartWorkRequest = () => ({ type: CONFIRM_START_WORK_REQUEST })
const confirmStartWorkSuccess = (res) => ({ type: CONFIRM_START_WORK_SUCCESS, res })
const confirmStartWorkFailure = (err) => ({ type: CONFIRM_START_WORK_FAILURE, err })

export const confirmStartWork = (jobId: Number) => async (dispatch, getState) => {
  try {
    dispatch(confirmStartWorkRequest())
    const state = getState()
    const JobController = daoByType('JobController')(state)
    const signer = signerSelector()(state)
    const web3 = web3Selector()(state)
    const tx = await JobController.confirmStartWork(signer.address, jobId)
    const res = await dispatch(executeTransaction({ tx, web3, signer }))
    dispatch(confirmStartWorkSuccess(res))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    dispatch(confirmStartWorkFailure(err))
  }
}

export const END_WORK_REQUEST = 'END_WORK_REQUEST'
export const END_WORK_SUCCESS = 'END_WORK_SUCCESS'
export const END_WORK_FAILURE = 'END_WORK_FAILURE'

const endWorkRequest = (req) => ({ type: END_WORK_REQUEST, req })
const endWorkSuccess = (res) => ({ type: END_WORK_SUCCESS, res })
const endWorkFailure = (err) => ({ type: END_WORK_FAILURE, err })

export const endWork = (id) => async (dispatch, getState) => {
  try {
    dispatch(endWorkRequest({ id }))
    const state = getState()
    const JobController = daoByType('JobController')(state)
    const signer = signerSelector()(state)
    const web3 = web3Selector()(state)
    const tx = JobController.endWork(signer.address, id)
    const res = await dispatch(executeTransaction({ tx, web3, signer }))
    dispatch(endWorkSuccess(res))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    dispatch(endWorkFailure(err))
  }
}

export const PAY_REQUEST = 'PAY_REQUEST'
export const PAY_SUCCESS = 'PAY_SUCCESS'
export const PAY_FAILURE = 'PAY_FAILURE'

const payRequest = (req) => ({ type: PAY_REQUEST, req })
const paySuccess = (res) => ({ type: PAY_SUCCESS, res })
const payFailure = (err) => ({ type: PAY_FAILURE, err })

export const pay = (id) => async (dispatch, getState) => {
  try {
    dispatch(payRequest({ id }))
    const state = getState()
    const JobController = daoByType('JobController')(state)
    const signer = signerSelector()(state)
    const web3 = web3Selector()(state)
    const confirmEndWorkTx = JobController.confirmEndWork(signer.address, id)
    const confirmEndWorkRes = await dispatch(executeTransaction({ tx: confirmEndWorkTx, web3, signer }))
    const releasePaymentTx = JobController.releasePayment(signer.address, id)
    const releasePaymentRes = await dispatch(executeTransaction({ tx: releasePaymentTx, web3, signer }))
    dispatch(paySuccess({ confirmEndWorkRes, releasePaymentRes }))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    dispatch(payFailure(err))
  }
}