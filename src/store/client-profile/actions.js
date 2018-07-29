// @flow
import { initialize  } from 'redux-form'

import * as backendApi from "src/api/backend"
import { userTokenSelector } from "src/store/user/selectors"
import { FORM } from "./constants"
import { getInitialValues } from "./selectors"

export const SELECT_INITIAL_PROPS_REQUEST = 'CLIENT_PROFILE/SELECT_INITIAL_PROPS_REQUEST'
export const SELECT_INITIAL_PROPS_SUCCESS = 'CLIENT_PROFILE/SELECT_INITIAL_PROPS_SUCCESS'
export const SELECT_INITIAL_PROPS_FAILURE = 'CLIENT_PROFILE/SELECT_INITIAL_PROPS_FAILURE'
export const selectInitialPropsRequest = (req) => ({ type: SELECT_INITIAL_PROPS_REQUEST, payload: req })
export const selectInitialPropsSuccess = (res) => ({ type: SELECT_INITIAL_PROPS_SUCCESS, payload: res })
export const selectInitialPropsFailure = (err) => ({ type: SELECT_INITIAL_PROPS_FAILURE, payload: err })
export const selectInitialProps = () => async (dispatch, getState) => {
  try {
    dispatch(selectInitialPropsRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.reviewClientProfile(token)
    const currencies = await backendApi.getCurrencies()
    dispatch(selectInitialPropsSuccess({ profile, currencies }))
  } catch (err) {
    dispatch(selectInitialPropsFailure(err))
  }
}

export const SUBMIT_REQUEST = 'CLIENT_PROFILE/SUBMIT_REQUEST'
export const SUBMIT_SUCCESS = 'CLIENT_PROFILE/SUBMIT_SUCCESS'
export const SUBMIT_FAILURE = 'CLIENT_PROFILE/SUBMIT_FAILURE'
export const submitRequest = (req) => ({ type: SUBMIT_REQUEST, payload: req })
export const submitSuccess = (res) => ({ type: SUBMIT_SUCCESS, payload: res })
export const submitFailure = (err) => ({ type: SUBMIT_FAILURE, payload: err })
export const submit = (values) => async (dispatch, getState) => {
  try {
    dispatch(submitRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.submitClientProfile(values, token)
    dispatch(initialize(FORM, getInitialValues(profile)))
    dispatch(submitSuccess(profile))
  } catch (err) {
    dispatch(submitFailure(err))
  }
}
