import * as backendApi from "../../api/backend"


export const WORKER_PROFILE_REQUEST = 'WORKER_PROFILE/REQUEST'
export const WORKER_PROFILE_SUCCESS = 'WORKER_PROFILE/SUCCESS'
export const WORKER_PROFILE_FAILURE = 'WORKER_PROFILE/FAILURE'
export const workerProfileRequest = (req) => ({ type: WORKER_PROFILE_REQUEST, payload: req })
export const workerProfileSuccess = (res) => ({ type: WORKER_PROFILE_SUCCESS, payload: res })
export const workerProfileFailure = (err) => ({ type: WORKER_PROFILE_FAILURE, payload: err })
export const workerProfile = (address) => async (dispatch, getState) => {
  try {
    dispatch(workerProfileRequest())
    const workerProfile = await backendApi.getWorker(address)
    if (workerProfile) {
      dispatch(workerProfileSuccess({workerProfile, address}))
    }
  } catch (err) {
    dispatch(workerProfileFailure(err))
  }
}