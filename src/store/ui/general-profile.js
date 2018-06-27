import PropTypes from 'prop-types'
import { change } from 'redux-form'
import * as backendApi from './../../api/backend'
import { userTokenSelector } from "../user/selectors";
import ProfileModel from "../../api/backend/model/ProfileModel";
import {LEVEL1_FORM} from "../../components/GeneralProfile/GeneralProfileLevel1";
import {saveImage} from "../image";
import VerificationRequestLevel1Model from "../../api/backend/model/VerificationRequestLevel1Model";

export const AVATAR_UPLOAD_REQUEST = 'AVATAR_UPLOAD_REQUEST'
export const AVATAR_UPLOAD_SUCCESS = 'AVATAR_UPLOAD_SUCCESS'
export const AVATAR_UPLOAD_FAILURE = 'AVATAR_UPLOAD_FAILURE'

export const uploadAvatarRequest = (req) => ({ type: AVATAR_UPLOAD_REQUEST, req })
export const uploadAvatarSuccess = (res) => ({ type: AVATAR_UPLOAD_SUCCESS, res })
export const uploadAvatarFailure = (err) => ({ type: AVATAR_UPLOAD_FAILURE, err })

export const uploadAvatar = (file) => async (dispatch, getState) => {
  try {
    dispatch(uploadAvatarRequest({ file }))
    const state = getState()
    const token = userTokenSelector()(state)
    const res = await backendApi.uploadImage(file, token)
    dispatch(saveImage(res))
    dispatch(change(LEVEL1_FORM, 'avatar', res.id))
    dispatch(uploadAvatarSuccess(res))
  } catch (err) {
    dispatch(uploadAvatarFailure(err))
  }
}

export const LEVEL1_SUBMIT_REQUEST = 'LEVEL1_SUBMIT_REQUEST'
export const LEVEL1_SUBMIT_SUCCESS = 'LEVEL1_SUBMIT_SUCCESS'
export const LEVEL1_SUBMIT_FAILURE = 'LEVEL1_SUBMIT_FAILURE'

export const submitLevel1Request = (req) => ({ type: LEVEL1_SUBMIT_REQUEST, req })
export const submitLevel1Success = (res) => ({ type: LEVEL1_SUBMIT_SUCCESS, res })
export const submitLevel1Failure = (err) => ({ type: LEVEL1_SUBMIT_FAILURE, err })

export const submitLevel1 = (values: VerificationRequestLevel1Model) => async (dispatch, getState) => {
  try {
    dispatch(submitLevel1Request({ values }))
    const state = getState()
    const token = userTokenSelector()(state)
    const res = await backendApi.submitLevel1(values, token)
    dispatch(submitLevel1Success(res))
  } catch (err) {
    dispatch(submitLevel1Failure(err))
  }
}



export const schemaFactory = () => ({
  profile: PropTypes.instanceOf(ProfileModel),
  uploadAvatarLoading: PropTypes.bool,
  uploadAvatarSuccess: PropTypes.bool,
  uploadAvatarFailure: PropTypes.bool,
  submitLevel1Loading: PropTypes.bool,
  submitLevel1Failure: PropTypes.bool,
})

const STATE = {
  profile: null,
  uploadAvatarRequest: false,
  uploadAvatarSuccess: false,
  uploadAvatarFailure: false,
}

const mutations = {

  [ PROFILE_REVIEW_REQUEST ]: (state, { req }) => ({ ...state, profile: req }),
  [ PROFILE_REVIEW_SUCCESS ]: (state, { res }) => ({ ...state, profile: res }),
  [ PROFILE_REVIEW_FAILURE ]: (state, { err }) => ({ ...state, profile: err }),

  [ AVATAR_UPLOAD_REQUEST ]: (state, { req }) => ({ ...state, uploadAvatarRequest: true }),
  [ AVATAR_UPLOAD_SUCCESS ]: (state, { res }) => ({ ...state, uploadAvatarRequest: false, uploadAvatarSuccess: res }),
  [ AVATAR_UPLOAD_FAILURE ]: (state, { err }) => ({ ...state, uploadAvatarRequest: false, uploadAvatarFailure: err }),

}

const reducer = (state = STATE, { type, ...other }) => type in mutations ? mutations[type](state, other) : state

export default reducer