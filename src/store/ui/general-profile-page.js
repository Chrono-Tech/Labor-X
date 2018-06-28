import PropTypes from 'prop-types'
import { change, reset, initialize, getFormSyncErrors, getFormMeta, getFormValues } from 'redux-form'
import { createSelector } from 'reselect'
import * as backendApi from './../../api/backend'
import { userTokenSelector } from "../user/selectors"
import ProfileModel from "../../api/backend/model/ProfileModel"
import ProfilePersonalVerificationRequestModel from "../../api/backend/model/ProfilePersonalVerificationRequestModel"
import ImageModel from "../../api/backend/model/ImageModel"
import ProfilePersonalModel from "../../api/backend/model/ProfilePersonalModel"
import ProfilePersonalFormModel from "../../models/form/ProfilePersonalFormModel"
import FileModel from "../../models/FileModel"
import ProfileContactsVerificationRequestModel from "../../api/backend/model/ProfileContactsVerificationRequestModel"
import ProfileContactsFormModel from "../../models/form/ProfileContactsFormModel"
import ProfileContactsConfirmationRequestModel from "../../api/backend/model/ProfileContactsConfirmationRequestModel"

export const PROFILE_PERSONAL_FORM = 'GENERAL_PROFILE_PAGE/FORM/PROFILE_PERSONAL'
export const PROFILE_CONTACTS_FORM = 'GENERAL_PROFILE_PAGE/FORM/PROFILE_CONTACTS'
export const PROFILE_PASSPORT_FORM = 'GENERAL_PROFILE_PAGE/FORM/PROFILE_PASSPORT'
export const PROFILE_LOCATION_FORM = 'GENERAL_PROFILE_PAGE/FORM/PROFILE_LOCATION'
export const PROFILE_CONTACTS_CONFIRMATION_FORM = 'GENERAL_PROFILE_PAGE/FORM/PROFILE_CONTACTS_CONFIRMATION'

export const VALIDATION_STATE = {
  INITIAL: 'INITIAL',
  WAITING: 'WAITING',
  WARNING: 'WARNING',
  SUCCESS: 'SUCCESS',
}

// Actions

export const PROFILE_REVIEW_REQUEST = 'GENERAL_PROFILE_PAGE/PROFILE_REVIEW/REQUEST'
export const PROFILE_REVIEW_SUCCESS = 'GENERAL_PROFILE_PAGE/PROFILE_REVIEW/SUCCESS'
export const PROFILE_REVIEW_FAILURE = 'GENERAL_PROFILE_PAGE/PROFILE_REVIEW/FAILURE'
export const reviewProfileRequest = (req) => ({ type: PROFILE_REVIEW_REQUEST, req })
export const reviewProfileSuccess = (res) => ({ type: PROFILE_REVIEW_SUCCESS, res })
export const reviewProfileFailure = (err) => ({ type: PROFILE_REVIEW_FAILURE, err })
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

export const PROFILE_UPDATE = 'GENERAL_PROFILE_PAGE/PROFILE_UPDATE'
export const updateProfile = (profile: ProfileModel) => ({ type: PROFILE_UPDATE, profile })

export const NEW_AVATAR_CREATE_REQUEST = 'GENERAL_PROFILE_PAGE/NEW_AVATAR_CREATE/REQUEST'
export const NEW_AVATAR_CREATE_SUCCESS = 'GENERAL_PROFILE_PAGE/NEW_AVATAR_CREATE/SUCCESS'
export const NEW_AVATAR_CREATE_FAILURE = 'GENERAL_PROFILE_PAGE/NEW_AVATAR_CREATE/FAILURE'
export const createNewAvatarRequest = (req) => ({ type: NEW_AVATAR_CREATE_REQUEST, req })
export const createNewAvatarSuccess = (res) => ({ type: NEW_AVATAR_CREATE_SUCCESS, res })
export const createNewAvatarFailure = (err) => ({ type: NEW_AVATAR_CREATE_FAILURE, err })
export const createNewAvatar = (file: FileModel) => async (dispatch, getState) => {
  try {
    dispatch(createNewAvatarRequest({ file }))
    const state = getState()
    const token = userTokenSelector()(state)
    const image = await backendApi.uploadImage(file, token)
    dispatch(change(PROFILE_PERSONAL_FORM, 'avatar', image.id))
    dispatch(createNewAvatarSuccess(image))
  } catch (err) {
    dispatch(createNewAvatarFailure(err))
  }
}

export const NEW_AVATAR_DELETE = 'GENERAL_PROFILE_PAGE/NEW_AVATAR_DELETE'
export const deleteNewAvatar = () => ({ type: NEW_AVATAR_DELETE })

export const resetProfilePersonalForm = () => async (dispatch) => {
  dispatch(reset(PROFILE_PERSONAL_FORM))
  dispatch(deleteNewAvatar())
}

export const PROFILE_PERSONAL_SUBMIT_REQUEST = 'GENERAL_PROFILE_PAGE/PROFILE_PERSONAL_SUBMIT/REQUEST'
export const PROFILE_PERSONAL_SUBMIT_SUCCESS = 'GENERAL_PROFILE_PAGE/PROFILE_PERSONAL_SUBMIT/SUCCESS'
export const PROFILE_PERSONAL_SUBMIT_FAILURE = 'GENERAL_PROFILE_PAGE/PROFILE_PERSONAL_SUBMIT/FAILURE'
export const submitProfilePersonalRequest = (req) => ({ type: PROFILE_PERSONAL_SUBMIT_REQUEST, req })
export const submitProfilePersonalSuccess = (res) => ({ type: PROFILE_PERSONAL_SUBMIT_SUCCESS, res })
export const submitProfilePersonalFailure = (err) => ({ type: PROFILE_PERSONAL_SUBMIT_FAILURE, err })
export const submitProfilePersonal = (data: ProfilePersonalVerificationRequestModel) => async (dispatch, getState) => {
  try {
    dispatch(submitProfilePersonalRequest({ data }))
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.submitProfilePersonal(data, token)
    dispatch(updateProfile(profile))
    dispatch(initialize(PROFILE_PERSONAL_FORM, ProfilePersonalFormModel.fromProfilePersonalModel(profile.personal)))
    dispatch(submitProfilePersonalSuccess(profile))
  } catch (err) {
    dispatch(submitProfilePersonalFailure(err))
  }
}

export const PROFILE_CONTACTS_SUBMIT_REQUEST = 'GENERAL_PROFILE_PAGE/PROFILE_CONTACTS_SUBMIT/REQUEST'
export const PROFILE_CONTACTS_SUBMIT_SUCCESS = 'GENERAL_PROFILE_PAGE/PROFILE_CONTACTS_SUBMIT/SUCCESS'
export const PROFILE_CONTACTS_SUBMIT_FAILURE = 'GENERAL_PROFILE_PAGE/PROFILE_CONTACTS_SUBMIT/FAILURE'
export const submitProfileContactsRequest = (req) => ({ type: PROFILE_CONTACTS_SUBMIT_REQUEST, req })
export const submitProfileContactsSuccess = (res) => ({ type: PROFILE_CONTACTS_SUBMIT_SUCCESS, res })
export const submitProfileContactsFailure = (err) => ({ type: PROFILE_CONTACTS_SUBMIT_FAILURE, err })
export const submitProfileContacts = (data: ProfileContactsVerificationRequestModel) => async (dispatch, getState) => {
  try {
    dispatch(submitProfileContactsRequest({ data }))
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.submitProfileContacts(data, token)
    dispatch(updateProfile(profile))
    dispatch(initialize(PROFILE_CONTACTS_FORM, ProfileContactsFormModel.fromProfileContactsModel(profile.contacts)))
    dispatch(showProfileContactsConfirmationDialog())
    dispatch(submitProfileContactsSuccess(profile))
  } catch (err) {
    dispatch(submitProfileContactsFailure(err))
  }
}

export const PROFILE_CONTACTS_CONFIRMATION_DIALOG_SHOW = 'GENERAL_PROFILE_PAGE/PROFILE_CONTACTS_CONFIRMATION_DIALOG/SHOW'
export const PROFILE_CONTACTS_CONFIRMATION_DIALOG_HIDE = 'GENERAL_PROFILE_PAGE/PROFILE_CONTACTS_CONFIRMATION_DIALOG/HIDE'
export const showProfileContactsConfirmationDialog = () => ({ type: PROFILE_CONTACTS_CONFIRMATION_DIALOG_SHOW })
export const hideProfileContactsConfirmationDialog = () => ({ type: PROFILE_CONTACTS_CONFIRMATION_DIALOG_HIDE })

export const EMAIL_CODE_RESEND_REQUEST = 'GENERAL_PROFILE_PAGE/EMAIL_CODE_RESEND/REQUEST'
export const EMAIL_CODE_RESEND_SUCCESS = 'GENERAL_PROFILE_PAGE/EMAIL_CODE_RESEND/SUCCESS'
export const EMAIL_CODE_RESEND_FAILURE = 'GENERAL_PROFILE_PAGE/EMAIL_CODE_RESEND/FAILURE'
export const resendEmailCodeRequest = (req) => ({ type: EMAIL_CODE_RESEND_REQUEST, req })
export const resendEmailCodeSuccess = (res) => ({ type: EMAIL_CODE_RESEND_SUCCESS, res })
export const resendEmailCodeFailure = (err) => ({ type: EMAIL_CODE_RESEND_FAILURE, err })
export const resendEmailCode = () => async (dispatch, getState) => {
  try {
    dispatch(resendEmailCodeRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const res = await backendApi.resendEmailCode(token)
    dispatch(resendEmailCodeSuccess(res))
  } catch (err) {
    dispatch(resendEmailCodeFailure(err))
  }
}

export const PHONE_CODE_RESEND_REQUEST = 'GENERAL_PROFILE_PAGE/PHONE_CODE_RESEND/REQUEST'
export const PHONE_CODE_RESEND_SUCCESS = 'GENERAL_PROFILE_PAGE/PHONE_CODE_RESEND/SUCCESS'
export const PHONE_CODE_RESEND_FAILURE = 'GENERAL_PROFILE_PAGE/PHONE_CODE_RESEND/FAILURE'
export const resendPhoneCodeRequest = (req) => ({ type: PHONE_CODE_RESEND_REQUEST, req })
export const resendPhoneCodeSuccess = (res) => ({ type: PHONE_CODE_RESEND_SUCCESS, res })
export const resendPhoneCodeFailure = (err) => ({ type: PHONE_CODE_RESEND_FAILURE, err })
export const resendPhoneCode = () => async (dispatch, getState) => {
  try {
    dispatch(resendPhoneCodeRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const res = await backendApi.resendPhoneCode(token)
    dispatch(resendPhoneCodeSuccess(res))
  } catch (err) {
    dispatch(resendPhoneCodeFailure(err))
  }
}

export const PROFILE_CONTACTS_CONFIRM_REQUEST = 'GENERAL_PROFILE_PAGE/PROFILE_CONTACTS_CONFIRM/REQUEST'
export const PROFILE_CONTACTS_CONFIRM_SUCCESS = 'GENERAL_PROFILE_PAGE/PROFILE_CONTACTS_CONFIRM/SUCCESS'
export const PROFILE_CONTACTS_CONFIRM_FAILURE = 'GENERAL_PROFILE_PAGE/PROFILE_CONTACTS_CONFIRM/FAILURE'
export const confirmProfileContactsRequest = (req) => ({ type: PROFILE_CONTACTS_CONFIRM_REQUEST, req })
export const confirmProfileContactsSuccess = (res) => ({ type: PROFILE_CONTACTS_CONFIRM_SUCCESS, res })
export const confirmProfileContactsFailure = (err) => ({ type: PROFILE_CONTACTS_CONFIRM_FAILURE, err })
export const confirmProfileContacts = (data: ProfileContactsConfirmationRequestModel) => async (dispatch, getState) => {
  try {
    dispatch(confirmProfileContactsRequest({ data }))
    const state = getState()
    const token = userTokenSelector()(state)
    const res = await backendApi.confirmProfileContacts(data, token)
    dispatch(updateProfile(res.profile))
    if (res.profile.level2.approved && !res.profile.level2.submitted) { dispatch(hideProfileContactsConfirmationDialog()) }
    dispatch(confirmProfileContactsSuccess(res))
  } catch (err) {
    dispatch(confirmProfileContactsFailure(err))
  }
}

// Reducer

export const schemaFactory = () => ({

  reviewProfileLoading: PropTypes.bool,
  profile: PropTypes.instanceOf(ProfileModel),
  reviewProfileFailure: PropTypes.instanceOf(Error),

  createNewAvatarLoading: PropTypes.bool,
  newAvatar: PropTypes.instanceOf(ImageModel),
  createNewAvatarFailure: PropTypes.bool,

  profileContactsConfirmationDialogOpen: PropTypes.bool.isRequired,

})

const STATE = {

  reviewProfileLoading: true,
  profile: null,
  reviewProfileFailure: null,

  createNewAvatarLoading: false,
  newAvatar: null,
  createNewAvatarFailure: null,

  profileContactsConfirmationDialogOpen: false,

  confirmProfileContactsResults: null,

}

const mutations = {

  [ PROFILE_REVIEW_REQUEST ]: (state) => ({ ...state, reviewProfileLoading: true, reviewProfileFailure: null }),
  [ PROFILE_REVIEW_SUCCESS ]: (state, { res }) => ({ ...state, reviewProfileLoading: false, profile: res }),
  [ PROFILE_REVIEW_FAILURE ]: (state, { err }) => ({ ...state, reviewProfileLoading: false, reviewProfileFailure: err }),

  [ PROFILE_UPDATE ]: (state, { profile }) => ({ ...state, profile }),

  [ NEW_AVATAR_CREATE_REQUEST ]: (state) => ({ ...state, createNewAvatarLoading: true, createNewAvatarFailure: null }),
  [ NEW_AVATAR_CREATE_SUCCESS ]: (state, { res }) => ({ ...state, createNewAvatarLoading: false, newAvatar: res }),
  [ NEW_AVATAR_CREATE_FAILURE ]: (state, { err }) => ({ ...state, createNewAvatarLoading: false, createNewAvatarFailure: err }),

  [ NEW_AVATAR_DELETE ]: (state) => ({ ...state, newAvatar: null }),

  [ PROFILE_CONTACTS_CONFIRMATION_DIALOG_SHOW ]: (state) => ({ ...state, profileContactsConfirmationDialogOpen: true }),
  [ PROFILE_CONTACTS_CONFIRMATION_DIALOG_HIDE ]: (state) => ({ ...state, profileContactsConfirmationDialogOpen: false }),

  [ PROFILE_CONTACTS_CONFIRM_SUCCESS ]: (state, { res }) => ({ ...state, confirmProfileContactsResults: res }),

}

const reducer = (state = STATE, { type, ...other }) => type in mutations ? mutations[type](state, other) : state

export default reducer

// Selectors

export const getState = state => state.ui.generalProfilePage

export const getNewAvatar = createSelector(getState, state => state.newAvatar)

export const getProfile = createSelector(getState, state => state.profile)
export const getProfilePersonal = createSelector(getProfile, state => state.level1)
export const getProfilePersonalIsSubmitted = createSelector(getProfilePersonal, state => !!state.submitted)
export const getProfilePersonalIsApproved = createSelector(getProfilePersonal, state => !!state.approved)
export const getProfilePersonalValidationComment = createSelector(getProfilePersonal, state => state.submitted && state.submitted.validationComment)
export const getProfilePersonalFormErrors = (state) => getFormSyncErrors(PROFILE_PERSONAL_FORM)(state)
export const getProfilePersonalFormMeta = (state) => getFormMeta(PROFILE_PERSONAL_FORM)(state)

export const getAvatarUrl = createSelector(
  [ getProfilePersonal, getNewAvatar ],
  (profilePersonal: ProfilePersonalModel, newAvatar: ImageModel) => {
    if (newAvatar) return newAvatar.url
    const data = profilePersonal.submitted || profilePersonal.approved
    if (data) return data.avatar.url
    return '/static/images/profile-photo.jpg'
  }
)

export const getProfileContacts = createSelector(getProfile, state => state.level2)
export const getProfileContactsIsSubmitted = createSelector(getProfileContacts, state => !!state.submitted)
export const getProfileContactsIsApproved = createSelector(getProfileContacts, state => !!state.approved)
export const getProfileContactsValidationComment = createSelector(getProfileContacts, state => state.submitted && state.submitted.validationComment)
export const getProfileContactsFormErrors = (state) => getFormSyncErrors(PROFILE_CONTACTS_FORM)(state)
export const getProfileContactsFormMeta = (state) => getFormMeta(PROFILE_CONTACTS_FORM)(state)
export const getProfileContactsFormValues = (state) => getFormValues(PROFILE_CONTACTS_FORM)(state) || {}
export const getProfileContactsValidationState = createSelector(
  [ getProfileContacts ],
  ({ submitted, approved }) => {
    if (!submitted && !approved) return VALIDATION_STATE.INITIAL
    if (submitted && !submitted.validationComment) return VALIDATION_STATE.WAITING
    if (submitted && submitted.validationComment) return VALIDATION_STATE.WARNING
    if (!submitted && approved) return VALIDATION_STATE.SUCCESS
  }
)

export const getProfileContactsIsEmailConfirmed = createSelector(getProfileContacts, state => state.submitted ? state.submitted.isEmailConfirmed : false)
export const getProfileContactsIsPhoneConfirmed = createSelector(getProfileContacts, state => state.submitted ? state.submitted.isPhoneConfirmed : false)

export const getProfileContactsConfirmationDialogOpen = createSelector(getState, state => state.profileContactsConfirmationDialogOpen)
export const getProfileContactsConfirmationDialogConfirmationResults = createSelector(getState, state => state.confirmProfileContactsResults)

