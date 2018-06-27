import PropTypes from 'prop-types'
import { change, reset, initialize, getFormSyncErrors, getFormMeta } from 'redux-form'
import { createSelector } from 'reselect'
import * as backendApi from './../../api/backend'
import { userTokenSelector } from "../user/selectors"
import ProfileModel from "../../api/backend/model/ProfileModel"
import ProfilePersonalVerificationRequestModel from "../../api/backend/model/ProfilePersonalVerificationRequestModel"
import ImageModel from "../../api/backend/model/ImageModel"
import ProfilePersonalModel from "../../api/backend/model/ProfilePersonalModel"
import ProfilePersonalFormModel from "../../models/form/ProfilePersonalFormModel"
import FileModel from "../../models/FileModel"

export const PROFILE_PERSONAL_FORM = 'GENERAL_PROFILE_PAGE/FORM/PROFILE_PERSONAL'
export const PROFILE_CONTACTS_FORM = 'GENERAL_PROFILE_PAGE/FORM/PROFILE_CONTACTS'
export const PROFILE_PASSPORT_FORM = 'GENERAL_PROFILE_PAGE/FORM/PROFILE_PASSPORT'
export const PROFILE_LOCATION_FORM = 'GENERAL_PROFILE_PAGE/FORM/PROFILE_LOCATION'

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

// Reducer

export const schemaFactory = () => ({

  reviewProfileLoading: PropTypes.bool,
  profile: PropTypes.instanceOf(ProfileModel),
  reviewProfileFailure: PropTypes.instanceOf(Error),

  createNewAvatarLoading: PropTypes.bool,
  newAvatar: PropTypes.instanceOf(ImageModel),
  createNewAvatarFailure: PropTypes.bool,

})

const STATE = {

  reviewProfileLoading: true,
  profile: null,
  reviewProfileFailure: null,

  createNewAvatarLoading: false,
  newAvatar: null,
  createNewAvatarFailure: null,

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

}

const reducer = (state = STATE, { type, ...other }) => type in mutations ? mutations[type](state, other) : state

export default reducer

// Selectors

export const getState = state => state.ui.generalProfilePage
export const getProfile = createSelector(getState, state => state.profile)
export const getProfilePersonal = createSelector(getProfile, state => state.level1)
export const getNewAvatar = createSelector(getState, state => state.newAvatar)
export const getAvatarUrl = createSelector(
  [ getProfilePersonal, getNewAvatar ],
  (profilePersonal: ProfilePersonalModel, newAvatar: ImageModel) => {
    if (newAvatar) return newAvatar.url
    const data = profilePersonal.submitted || profilePersonal.approved
    if (data) return data.avatar.url
    return '/static/images/profile-photo.jpg'
  }
)
export const getProfilePersonalIsSubmitted = createSelector(getProfilePersonal, state => !!state.submitted)
export const getProfilePersonalIsApproved = createSelector(getProfilePersonal, state => !!state.approved)
export const getProfilePersonalValidationComment = createSelector(getProfilePersonal, state => state.submitted && state.submitted.validationComment)
export const getProfilePersonalFormErrors = (state) => getFormSyncErrors(PROFILE_PERSONAL_FORM)(state)
export const getProfilePersonalFormMeta = (state) => getFormMeta(PROFILE_PERSONAL_FORM)(state)
