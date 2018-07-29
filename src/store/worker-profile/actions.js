import { initialize, change, formValueSelector } from 'redux-form'
import * as backendApi from "../../api/backend"
import { userTokenSelector } from "../user/selectors"
import { getWorkerProfileInitialValues, workerProfileModelFromForm} from "./selectors"
import { WORKER_PROFILE_FORM } from "./reducer"
import FileModel from "../../models/FileModel"

export const WORKER_PROFILE_SUMBIT_REQUEST = 'WORKER_PROFILE/PROFILE_SUMBIT/REQUEST'
export const WORKER_PROFILE_SUMBIT_SUCCESS = 'WORKER_PROFILE/PROFILE_SUMBIT/SUCCESS'
export const WORKER_PROFILE_SUMBIT_FAILURE = 'WORKER_PROFILE/PROFILE_REVIEW/FAILURE'
export const submitWorkerProfileRequest = (req) => ({ type: WORKER_PROFILE_SUMBIT_REQUEST, payload: req })
export const submitWorkerProfileSuccess = (res) => ({ type: WORKER_PROFILE_SUMBIT_SUCCESS, payload: res })
export const submitWorkerProfileFailure = (err) => ({ type: WORKER_PROFILE_SUMBIT_FAILURE, payload: err })
export const submitWorkerProfile = (data, serviceAttachments) => async (dispatch, getState) => {
  try {
    const workerProfile = workerProfileModelFromForm(data);
    dispatch(submitWorkerProfileRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const res = await backendApi.submitWorkerProfile(workerProfile, token)
    const initialValues = getWorkerProfileInitialValues(res.profile)
    dispatch(initialize(WORKER_PROFILE_FORM, initialValues))
    dispatch(submitWorkerProfileSuccess(res.profile))
  } catch (err) {
    dispatch(submitWorkerProfileFailure(err))
  }
}

export const GET_WORKER_PROFILE_REQUEST = 'WORKER_PROFILE/GET/REQUEST'
export const GET_WORKER_PROFILE_SUCCESS = 'WORKER_PROFILE/GET/SUCCESS'
export const GET_WORKER_PROFILE_FAILURE = 'WORKER_PROFILE/GET/FAILURE'
export const getWorkerProfileRequest = (req) => ({ type: GET_WORKER_PROFILE_REQUEST, payload: req })
export const getWorkerProfileSuccess = (res) => ({ type: GET_WORKER_PROFILE_SUCCESS, payload: res })
export const getWorkerProfileFailure = (err) => ({ type: GET_WORKER_PROFILE_FAILURE, payload: err })
export const getWorkerProfile = () => async (dispatch, getState) => {
  try {
    dispatch(getWorkerProfileRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const res = await backendApi.getWorkerProfile(token)
    const initialValues = getWorkerProfileInitialValues(res.profile);
    dispatch(initialize(WORKER_PROFILE_FORM, initialValues))
    dispatch(getWorkerProfileSuccess(res.profile))
  } catch (err) {
    dispatch(getWorkerProfileFailure(err))
  }
}

export const WORKER_PAGE_DATA_REQUEST = 'WORKER_PAGE_DATA/REQUEST'
export const WORKER_PAGE_DATA_SUCCESS = 'WORKER_PAGE_DATA/SUCCESS'
export const WORKER_PAGE_DATA_FAILURE = 'WORKER_PAGE_DATA/FAILURE'
export const initWorkerPageDataRequest = () => ({ type: WORKER_PAGE_DATA_REQUEST })
export const initWorkerPageDataSuccess = ({ serviceCategories, currencies }) => ({ type: WORKER_PAGE_DATA_SUCCESS, payload: { serviceCategories, currencies } })
export const initWorkerPageDataFailure = (err) => ({ type: WORKER_PAGE_DATA_FAILURE, payload: err })
export const initWorkerPageData = () => async (dispatch) => {
  try {
    dispatch(initWorkerPageDataRequest())
    const serviceCategories = await backendApi.getServiceCategories()
    const currencies = await backendApi.getCurrencies()
    dispatch(initWorkerPageDataSuccess({ serviceCategories, currencies }))
  } catch (err) {
    dispatch(initWorkerPageDataFailure(err))
  }
}

export const createExperience = () => async (dispatch, getState) => {
   const state = getState();
   const experiences = formValueSelector(WORKER_PROFILE_FORM)(state, 'employments')
   dispatch(change(WORKER_PROFILE_FORM, "employments",  [...experiences, {}]))
}

export const createService = () => async (dispatch, getState) => {
  const state = getState();
  const services = formValueSelector(WORKER_PROFILE_FORM)(state, 'services')
  dispatch(change(WORKER_PROFILE_FORM, "services",  [...services, {}]))
}

export const removeExperience = (index) => async (dispatch, getState) => {
  const state = getState();
  const experiences = formValueSelector(WORKER_PROFILE_FORM)(state, 'employments')
  experiences.splice(index, 1)
  dispatch(change(WORKER_PROFILE_FORM, "employments",  experiences))
}


export const removeService = (index) => async (dispatch, getState) => {
 const state = getState();
 let services = formValueSelector(WORKER_PROFILE_FORM)(state, 'services')
 services.splice(index, 1)
 dispatch(change(WORKER_PROFILE_FORM, "services",  services))
}




export const SERVICE_ATTACHMENT_CREATE_REQUEST = 'WORKER_PROFILE/SERVICE_ATTACHMENT_CREATE/REQUEST'
export const SERVICE_ATTACHMENT_CREATE_SUCCESS = 'WORKER_PROFILE/SERVICE_ATTACHMENT_CREATE/SUCCESS'
export const SERVICE_ATTACHMENT_CREATE_FAILURE = 'WORKER_PROFILE/SERVICE_ATTACHMENT_CREATE/FAILURE'
export const createServiceAttachmentRequest = (req) => ({ type: SERVICE_ATTACHMENT_CREATE_REQUEST, payload: req })
export const createServiceAttachmentSuccess = (res) => ({ type: SERVICE_ATTACHMENT_CREATE_SUCCESS, payload: res })
export const createServiceAttachmentFailure = (err) => ({ type: SERVICE_ATTACHMENT_CREATE_FAILURE, payload: err })
export const createServiceAttachment = (file: FileModel, serviceIndex: Number) => async (dispatch, getState) => {
  try {
    dispatch(createServiceAttachmentRequest({ file }))
    const state = getState()
    const token = userTokenSelector()(state)
    const attachment = await backendApi.uploadAttachment(file, token)
    dispatch(createServiceAttachmentSuccess({ attachment, file, serviceIndex }))
  } catch (err) {
    dispatch(createServiceAttachmentFailure(err))
  }
}



export const SERVICE_ATTACHMENT_DELETE = 'WORKER_PROFILE/SERVICE_ATTACHMENT_DELETE'
export const deleteServiceAttachment = (id) => async (dispatch, getState) => {
  dispatch({ type: SERVICE_ATTACHMENT_DELETE, payload: id });
}