import { reset, change, initialize, formValueSelector } from 'redux-form'

import * as backendApi from "../../api/backend"
import { userTokenSelector } from "../user/selectors"
import { FORM_CONTACTS, FORM_LOCATION, FORM_PASSPORT, FORM_PERSONAL } from "./reducer"
import { getContactsInitialValues, getLocationInitialValues, getPassportInitialValues, getPersonalInitialValues } from "./selectors"
import FileModel from "../../models/FileModel"

export const WORKER_PROFILE_REVIEW_REQUEST = 'WORKER_PROFILE/PROFILE_REVIEW/REQUEST'
export const WORKER_PROFILE_REVIEW_SUCCESS = 'WORKER_PROFILE/PROFILE_REVIEW/SUCCESS'
export const WORKER_PROFILE_REVIEW_FAILURE = 'WORKER_PROFILE/PROFILE_REVIEW/FAILURE'
export const reviewWorkerProfileRequest = (req) => ({ type: WORKER_PROFILE_REVIEW_REQUEST, payload: req })
export const reviewWorkerProfileSuccess = (res) => ({ type: WORKER_PROFILE_REVIEW_SUCCESS, payload: res })
export const reviewWorkerProfileFailure = (err) => ({ type: WORKER_PROFILE_REVIEW_FAILURE, payload: err })
export const reviewWorkerProfile = () => async (dispatch, getState) => {
  try {
    dispatch(reviewWorkerProfileRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.reviewWorkerProfile(token)
    dispatch(reviewWorkerProfileSuccess(profile))
  } catch (err) {
    dispatch(reviewWorkerProfileFailure(err))
  }
}




export const SERVICE_ATTACHMENT_CREATE_REQUEST = 'WORKER_PROFILE/SERVICE_ATTACHMENT_CREATE/REQUEST'
export const SERVICE_ATTACHMENT_CREATE_SUCCESS = 'WORKER_PROFILE/SERVICE_ATTACHMENT_CREATE/SUCCESS'
export const SERVICE_ATTACHMENT_CREATE_FAILURE = 'WORKER_PROFILE/SERVICE_ATTACHMENT_CREATE/FAILURE'
export const createServiceAttachmentRequest = (req) => ({ type: SERVICE_ATTACHMENT_CREATE_REQUEST, payload: req })
export const createServiceAttachmentSuccess = (res) => ({ type: SERVICE_ATTACHMENT_CREATE_SUCCESS, payload: res })
export const createServiceAttachmentFailure = (err) => ({ type: SERVICE_ATTACHMENT_CREATE_FAILURE, payload: err })
export const createServiceAttachment = (file: FileModel) => async (dispatch, getState) => {
  try {
    dispatch(createServiceAttachmentRequest({ file }))
    const state = getState()
    const token = userTokenSelector()(state)
    const attachment = await backendApi.uploadAttachment(file, token)
    const attachments = formValueSelector(FORM_PASSPORT)(state, 'attachments')
    dispatch(change(FORM_PASSPORT, 'attachments', [ ...attachments, attachment.id ]))
    dispatch(createServiceAttachmentSuccess({ attachment, file }))
  } catch (err) {
    dispatch(createServiceAttachmentFailure(err))
  }
}
