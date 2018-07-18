// @flow
import { reset, change, initialize, formValueSelector } from 'redux-form'

import * as backendApi from "../../api/backend"
import { userTokenSelector } from "../user/selectors"
import { FORM_CLIENT_PROFILE } from "./reducer"
import { getClientProfileInitialValues } from "./selectors"


export const CLIENT_PROFILE_REVIEW_REQUEST = 'CLIENT_PROFILE/PROFILE_REVIEW/REQUEST'
export const CLIENT_PROFILE_REVIEW_SUCCESS = 'CLIENT_PROFILE/PROFILE_REVIEW/SUCCESS'
export const CLIENT_PROFILE_REVIEW_FAILURE = 'CLIENT_PROFILE/PROFILE_REVIEW/FAILURE'
export const reviewClientProfileRequest = (req) => ({ type: PROFILE_REVIEW_REQUEST, payload: req })
export const reviewClientProfileSuccess = (res) => ({ type: PROFILE_REVIEW_SUCCESS, payload: res })
export const reviewClientProfileFailure = (err) => ({ type: PROFILE_REVIEW_FAILURE, payload: err })
export const reviewClientProfile = () => async (dispatch, getState) => {
  try {
    dispatch(reviewClientProfileRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.reviewClientProfile(token)
    dispatch(reviewClientProfileSuccess(profile))
  } catch (err) {
    dispatch(reviewClientProfileFailure(err))
  }
}


export const CLIENT_PROFILE_SUBMIT_REQUEST = 'CLIENT_PROFILE/SUBMIT/REQUEST'
export const CLIENT_PROFILE_SUBMIT_SUCCESS = 'CLIENT_PROFILE/SUBMIT/SUCCESS'
export const CLIENT_PROFILE_SUBMIT_FAILURE = 'CLIENT_PROFILE/SUBMIT/FAILURE'
export const submitClientProfileRequest = (req) => ({ type: PERSONAL_SUBMIT_REQUEST, payload: req })
export const submitClientProfileSuccess = (res) => ({ type: PERSONAL_SUBMIT_SUCCESS, payload: res })
export const submitClientProfileFailure = (err) => ({ type: PERSONAL_SUBMIT_FAILURE, payload: err })
export const submitClientProfile = (data) => async (dispatch, getState) => {
  try {
    dispatch(submitClientProfileRequest({ data }))
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.submitClientProfile(data, token)
    dispatch(initialize(FORM_CLIENT_PROFILE, getClientProfileInitialValues(profile.personal)))
    dispatch(submitClientProfileSuccess(profile))
  } catch (err) {
    dispatch(submitClientProfile(err))
  }
}