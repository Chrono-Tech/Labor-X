import { storeIntoIPFS } from 'src/utils'
import { daoByType } from '../daos/selectors'
import { signerSelector } from '../wallet/selectors'
import { executeTransaction } from '../ethereum/actions'
import { web3Selector } from '../ethereum/selectors'

export const JOBS_CLEAR = 'jobs/clear'
export const JOBS_SAVE = 'jobs/save'

export const initJobs = () => async (dispatch, getState) => {
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

export const createJob = (/*{ area, category, skills }*/) => async (dispatch, getState) => {
  const state = getState()
  const jobControlerDAO = daoByType('JobController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)
  const detailsIPFSHash = await storeIntoIPFS({
    foo: 'bar',
    bar: 'baz',
  })
  const tx = jobControlerDAO.createPostJobTx(signer.address, 1, 1, 1, detailsIPFSHash)
  await dispatch(executeTransaction({ tx, web3 }))
}
