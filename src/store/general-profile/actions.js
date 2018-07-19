// @flow
import { reset, change, initialize, formValueSelector } from 'redux-form'

import * as backendApi from "../../api/backend"
import { userTokenSelector } from "../user/selectors"
import { FORM_CONTACTS, FORM_LOCATION, FORM_PASSPORT, FORM_PERSONAL } from "./reducer"
import { getContactsInitialValues, getLocationInitialValues, getPassportInitialValues, getPersonalInitialValues } from "./selectors"
import FileModel from "../../models/FileModel"

export const PROFILE_REVIEW_REQUEST = 'GENERAL_PROFILE/PROFILE_REVIEW/REQUEST'
export const PROFILE_REVIEW_SUCCESS = 'GENERAL_PROFILE/PROFILE_REVIEW/SUCCESS'
export const PROFILE_REVIEW_FAILURE = 'GENERAL_PROFILE/PROFILE_REVIEW/FAILURE'
export const reviewProfileRequest = (req) => ({ type: PROFILE_REVIEW_REQUEST, payload: req })
export const reviewProfileSuccess = (res) => ({ type: PROFILE_REVIEW_SUCCESS, payload: res })
export const reviewProfileFailure = (err) => ({ type: PROFILE_REVIEW_FAILURE, payload: err })
export const reviewProfile = () => async (dispatch, getState) => {
  try {
    dispatch(reviewProfileRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.reviewProfile(token)
    dispatch(reviewProfileSuccess(profile))
  } catch (err) {
    dispatch(reviewProfileFailure(err))
  }
}

export const AVATAR_CREATE_REQUEST = 'GENERAL_PROFILE/AVATAR_CREATE/REQUEST'
export const AVATAR_CREATE_SUCCESS = 'GENERAL_PROFILE/AVATAR_CREATE/SUCCESS'
export const AVATAR_CREATE_FAILURE = 'GENERAL_PROFILE/AVATAR_CREATE/FAILURE'
export const createAvatarRequest = (req) => ({ type: AVATAR_CREATE_REQUEST, payload: req })
export const createAvatarSuccess = (res) => ({ type: AVATAR_CREATE_SUCCESS, payload: res })
export const createAvatarFailure = (err) => ({ type: AVATAR_CREATE_FAILURE, payload: err })
export const createAvatar = (file: FileModel) => async (dispatch, getState) => {
  try {
    dispatch(createAvatarRequest({ file }))
    const state = getState()
    const token = userTokenSelector()(state)
    const image = await backendApi.uploadImage(file, token)
    dispatch(change(FORM_PERSONAL, 'avatar', image.id))
    dispatch(createAvatarSuccess(image))
  } catch (err) {
    dispatch(createAvatarFailure(err))
  }
}

export const PERSONAL_SUBMIT_REQUEST = 'GENERAL_PROFILE/PERSONAL_SUBMIT/REQUEST'
export const PERSONAL_SUBMIT_SUCCESS = 'GENERAL_PROFILE/PERSONAL_SUBMIT/SUCCESS'
export const PERSONAL_SUBMIT_FAILURE = 'GENERAL_PROFILE/PERSONAL_SUBMIT/FAILURE'
export const submitPersonalRequest = (req) => ({ type: PERSONAL_SUBMIT_REQUEST, payload: req })
export const submitPersonalSuccess = (res) => ({ type: PERSONAL_SUBMIT_SUCCESS, payload: res })
export const submitPersonalFailure = (err) => ({ type: PERSONAL_SUBMIT_FAILURE, payload: err })
export const submitPersonal = (data) => async (dispatch, getState) => {
  try {
    dispatch(submitPersonalRequest({ data }))
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.submitProfilePersonal(data, token)
    dispatch(initialize(FORM_PERSONAL, getPersonalInitialValues(profile.personal)))
    dispatch(submitPersonalSuccess(profile))
  } catch (err) {
    dispatch(submitPersonalFailure(err))
  }
}

export const CONTACTS_SUBMIT_REQUEST = 'GENERAL_PROFILE/CONTACTS_SUBMIT/REQUEST'
export const CONTACTS_SUBMIT_SUCCESS = 'GENERAL_PROFILE/CONTACTS_SUBMIT/SUCCESS'
export const CONTACTS_SUBMIT_FAILURE = 'GENERAL_PROFILE/CONTACTS_SUBMIT/FAILURE'
export const submitContactsRequest = (req) => ({ type: CONTACTS_SUBMIT_REQUEST, payload: req })
export const submitContactsSuccess = (res) => ({ type: CONTACTS_SUBMIT_SUCCESS, payload: res })
export const submitContactsFailure = (err) => ({ type: CONTACTS_SUBMIT_FAILURE, payload: err })
export const submitContacts = (data) => async (dispatch, getState) => {
  try {
    dispatch(submitContactsRequest({ data }))
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.submitProfileContacts(data, token)
    dispatch(initialize(FORM_CONTACTS, getContactsInitialValues(profile.contacts)))
    dispatch(submitContactsSuccess(profile))
  } catch (err) {
    dispatch(submitContactsFailure(err))
  }
}

export const PASSPORT_SUBMIT_REQUEST = 'GENERAL_PROFILE/PASSPORT_SUBMIT/REQUEST'
export const PASSPORT_SUBMIT_SUCCESS = 'GENERAL_PROFILE/PASSPORT_SUBMIT/SUCCESS'
export const PASSPORT_SUBMIT_FAILURE = 'GENERAL_PROFILE/PASSPORT_SUBMIT/FAILURE'
export const submitPassportRequest = (req) => ({ type: PASSPORT_SUBMIT_REQUEST, payload: req })
export const submitPassportSuccess = (res) => ({ type: PASSPORT_SUBMIT_SUCCESS, payload: res })
export const submitPassportFailure = (err) => ({ type: PASSPORT_SUBMIT_FAILURE, payload: err })
export const submitPassport = (form) => async (dispatch, getState) => {
  try {
    dispatch(submitPassportRequest({ form }))
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.submitProfilePassport(form, token)
    dispatch(initialize(FORM_PASSPORT, getPassportInitialValues(profile.passport)))
    dispatch(submitPassportSuccess(profile))
  } catch (err) {
    dispatch(submitPassportFailure(err))
  }
}

export const LOCATION_SUBMIT_REQUEST = 'GENERAL_PROFILE/LOCATION_SUBMIT/REQUEST'
export const LOCATION_SUBMIT_SUCCESS = 'GENERAL_PROFILE/LOCATION_SUBMIT/SUCCESS'
export const LOCATION_SUBMIT_FAILURE = 'GENERAL_PROFILE/LOCATION_SUBMIT/FAILURE'
export const submitLocationRequest = (req) => ({ type: LOCATION_SUBMIT_REQUEST, payload: req })
export const submitLocationSuccess = (res) => ({ type: LOCATION_SUBMIT_SUCCESS, payload: res })
export const submitLocationFailure = (err) => ({ type: LOCATION_SUBMIT_FAILURE, payload: err })
export const submitLocation = (form) => async (dispatch, getState) => {
  try {
    dispatch(submitLocationRequest({ form }))
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.submitProfileLocation(form, token)
    dispatch(initialize(FORM_LOCATION, getLocationInitialValues(profile.location)))
    dispatch(submitLocationSuccess(profile))
  } catch (err) {
    dispatch(submitLocationFailure(err))
  }
}

export const EMAIL_CODE_RESEND_REQUEST = 'GENERAL_PROFILE/EMAIL_CODE_RESEND/REQUEST'
export const EMAIL_CODE_RESEND_SUCCESS = 'GENERAL_PROFILE/EMAIL_CODE_RESEND/SUCCESS'
export const EMAIL_CODE_RESEND_FAILURE = 'GENERAL_PROFILE/EMAIL_CODE_RESEND/FAILURE'
export const resendEmailCodeRequest = (req) => ({ type: EMAIL_CODE_RESEND_REQUEST, payload: req })
export const resendEmailCodeSuccess = (res) => ({ type: EMAIL_CODE_RESEND_SUCCESS, payload: res })
export const resendEmailCodeFailure = (err) => ({ type: EMAIL_CODE_RESEND_FAILURE, payload: err })
export const resendEmailCode = () => async (dispatch, getState) => {
  try {
    dispatch(resendEmailCodeRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.resendEmailCode(token)
    dispatch(resendEmailCodeSuccess(profile))
  } catch (err) {
    dispatch(resendEmailCodeFailure(err))
  }
}

export const PHONE_CODE_RESEND_REQUEST = 'GENERAL_PROFILE/PHONE_CODE_RESEND/REQUEST'
export const PHONE_CODE_RESEND_SUCCESS = 'GENERAL_PROFILE/PHONE_CODE_RESEND/SUCCESS'
export const PHONE_CODE_RESEND_FAILURE = 'GENERAL_PROFILE/PHONE_CODE_RESEND/FAILURE'
export const resendPhoneCodeRequest = (req) => ({ type: PHONE_CODE_RESEND_REQUEST, payload: req })
export const resendPhoneCodeSuccess = (res) => ({ type: PHONE_CODE_RESEND_SUCCESS, payload: res })
export const resendPhoneCodeFailure = (err) => ({ type: PHONE_CODE_RESEND_FAILURE, payload: err })
export const resendPhoneCode = () => async (dispatch, getState) => {
  try {
    dispatch(resendPhoneCodeRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.resendPhoneCode(token)
    dispatch(resendPhoneCodeSuccess(profile))
  } catch (err) {
    dispatch(resendPhoneCodeFailure(err))
  }
}

export const EMAIL_CODE_SUBMIT_REQUEST = 'GENERAL_PROFILE/EMAIL_CODE_SUBMIT/REQUEST'
export const EMAIL_CODE_SUBMIT_SUCCESS = 'GENERAL_PROFILE/EMAIL_CODE_SUBMIT/SUCCESS'
export const EMAIL_CODE_SUBMIT_FAILURE = 'GENERAL_PROFILE/EMAIL_CODE_SUBMIT/FAILURE'
export const submitEmailCodeRequest = (req) => ({ type: EMAIL_CODE_SUBMIT_REQUEST, payload: req })
export const submitEmailCodeSuccess = (res) => ({ type: EMAIL_CODE_SUBMIT_SUCCESS, payload: res })
export const submitEmailCodeFailure = (err) => ({ type: EMAIL_CODE_SUBMIT_FAILURE, payload: err })
export const submitEmailCode = (data) => async (dispatch, getState) => {
  try {
    dispatch(submitEmailCodeRequest({ data }))
    const state = getState()
    const token = userTokenSelector()(state)
    const res = await backendApi.confirmProfileContacts(data, token)
    dispatch(submitEmailCodeSuccess(res))
  } catch (err) {
    dispatch(submitEmailCodeFailure(err))
  }
}

export const PHONE_CODE_SUBMIT_REQUEST = 'GENERAL_PROFILE/PHONE_CODE_SUBMIT/REQUEST'
export const PHONE_CODE_SUBMIT_SUCCESS = 'GENERAL_PROFILE/PHONE_CODE_SUBMIT/SUCCESS'
export const PHONE_CODE_SUBMIT_FAILURE = 'GENERAL_PROFILE/PHONE_CODE_SUBMIT/FAILURE'
export const submitPhoneCodeRequest = (req) => ({ type: PHONE_CODE_SUBMIT_REQUEST, payload: req })
export const submitPhoneCodeSuccess = (res) => ({ type: PHONE_CODE_SUBMIT_SUCCESS, payload: res })
export const submitPhoneCodeFailure = (err) => ({ type: PHONE_CODE_SUBMIT_FAILURE, payload: err })
export const submitPhoneCode = (data) => async (dispatch, getState) => {
  try {
    dispatch(submitPhoneCodeRequest({ data }))
    const state = getState()
    const token = userTokenSelector()(state)
    const res = await backendApi.confirmProfileContacts(data, token)
    dispatch(submitPhoneCodeSuccess(res))
  } catch (err) {
    dispatch(submitPhoneCodeFailure(err))
  }
}

export const PASSPORT_ATTACHMENT_CREATE_REQUEST = 'GENERAL_PROFILE/PASSPORT_ATTACHMENT_CREATE/REQUEST'
export const PASSPORT_ATTACHMENT_CREATE_SUCCESS = 'GENERAL_PROFILE/PASSPORT_ATTACHMENT_CREATE/SUCCESS'
export const PASSPORT_ATTACHMENT_CREATE_FAILURE = 'GENERAL_PROFILE/PASSPORT_ATTACHMENT_CREATE/FAILURE'
export const createPassportAttachmentRequest = (req) => ({ type: PASSPORT_ATTACHMENT_CREATE_REQUEST, payload: req })
export const createPassportAttachmentSuccess = (res) => ({ type: PASSPORT_ATTACHMENT_CREATE_SUCCESS, payload: res })
export const createPassportAttachmentFailure = (err) => ({ type: PASSPORT_ATTACHMENT_CREATE_FAILURE, payload: err })
export const createPassportAttachment = (file: FileModel) => async (dispatch, getState) => {
  try {
    dispatch(createPassportAttachmentRequest({ file }))
    const state = getState()
    const token = userTokenSelector()(state)
    const attachment = await backendApi.uploadAttachment(file, token)
    const attachments = formValueSelector(FORM_PASSPORT)(state, 'attachments')
    dispatch(change(FORM_PASSPORT, 'attachments', [ ...attachments, attachment.id ]))
    dispatch(createPassportAttachmentSuccess({ attachment, file }))
  } catch (err) {
    dispatch(createPassportAttachmentFailure(err))
  }
}

export const LOCATION_ATTACHMENT_CREATE_REQUEST = 'GENERAL_PROFILE/LOCATION_ATTACHMENT_CREATE/REQUEST'
export const LOCATION_ATTACHMENT_CREATE_SUCCESS = 'GENERAL_PROFILE/LOCATION_ATTACHMENT_CREATE/SUCCESS'
export const LOCATION_ATTACHMENT_CREATE_FAILURE = 'GENERAL_PROFILE/LOCATION_ATTACHMENT_CREATE/FAILURE'
export const createLocationAttachmentRequest = (req) => ({ type: LOCATION_ATTACHMENT_CREATE_REQUEST, payload: req })
export const createLocationAttachmentSuccess = (res) => ({ type: LOCATION_ATTACHMENT_CREATE_SUCCESS, payload: res })
export const createLocationAttachmentFailure = (err) => ({ type: LOCATION_ATTACHMENT_CREATE_FAILURE, payload: err })
export const createLocationAttachment = (file) => async (dispatch, getState) => {
  try {
    dispatch(createLocationAttachmentRequest({ file }))
    const state = getState()
    const token = userTokenSelector()(state)
    const attachment = await backendApi.uploadAttachment(file, token)
    const attachments = formValueSelector(FORM_LOCATION)(state, 'attachments')
    dispatch(change(FORM_LOCATION, 'attachments', [ ...attachments, attachment.id ]))
    dispatch(createLocationAttachmentSuccess({ attachment, file }))
  } catch (err) {
    dispatch(createLocationAttachmentFailure(err))
  }
}

export const PERSONAL_RESET = 'GENERAL_PROFILE/PERSONAL_RESET'
export const resetPersonal = () => (dispatch) => {
  dispatch({ type: PERSONAL_RESET })
  dispatch(reset(FORM_PERSONAL))
}

export const LOCATION_RESET = 'GENERAL_PROFILE/LOCATION_RESET'
export const resetLocation = () => (dispatch) => {
  dispatch({ type: LOCATION_RESET })
  dispatch(reset(FORM_LOCATION))
}

export const PASSPORT_RESET = 'GENERAL_PROFILE/PASSPORT_RESET'
export const resetPassport = () => (dispatch) => {
  dispatch({ type: PASSPORT_RESET })
  dispatch(reset(FORM_PASSPORT))
}

export const VALIDATE_EMAIL_DIALOG_SHOW = 'GENERAL_PROFILE/VALIDATE_EMAIL_DIALOG/SHOW'
export const VALIDATE_EMAIL_DIALOG_HIDE = 'GENERAL_PROFILE/VALIDATE_EMAIL_DIALOG/HIDE'
export const showValidateEmailDialog = () => ({ type: VALIDATE_EMAIL_DIALOG_SHOW })
export const hideValidateEmailDialog = () => ({ type: VALIDATE_EMAIL_DIALOG_HIDE })

export const VALIDATE_PHONE_DIALOG_SHOW = 'GENERAL_PROFILE/VALIDATE_PHONE_DIALOG/SHOW'
export const VALIDATE_PHONE_DIALOG_HIDE = 'GENERAL_PROFILE/VALIDATE_PHONE_DIALOG/HIDE'
export const showValidatePhoneDialog = () => ({ type: VALIDATE_PHONE_DIALOG_SHOW })
export const hideValidatePhoneDialog = () => ({ type: VALIDATE_PHONE_DIALOG_HIDE })
