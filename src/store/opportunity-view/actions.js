// @flow
import * as backendApi from "../../api/backend"
import { } from "../user/selectors"

export const COMPANY_INFO_REQUEST = 'COMPANY_INFO/REQUEST'
export const COMPANY_INFO_SUCCESS = 'COMPANY_INFO/SUCCESS'
export const COMPANY_INFO_FAILURE = 'COMPANY_INFO/FAILURE'
export const companyInfoRequest = (req) => ({ type: COMPANY_INFO_REQUEST, payload: req })
export const companyInfoSuccess = (res) => ({ type: COMPANY_INFO_SUCCESS, payload: res })
export const companyInfoFailure = (err) => ({ type: COMPANY_INFO_FAILURE, payload: err })
export const companyInfo = (address) => async (dispatch, getState) => {
  try {
    dispatch(companyInfoRequest())
    const profile = await backendApi.getClient(address)
    dispatch(companyInfoSuccess(profile))
  } catch (err) {
    dispatch(companyInfoFailure(err))
  }
}
