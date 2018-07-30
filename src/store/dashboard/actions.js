import * as backendApi from 'src/api/backend'
import { userTokenSelector } from 'src/store'

export const GET_PAGE_DATA_REQUEST = 'DASHBOARD/GET_PAGE_DATA/REQUEST'
export const GET_PAGE_DATA_SUCCESS = 'DASHBOARD/GET_PAGE_DATA/SUCCESS'
export const GET_PAGE_DATA_FAILURE = 'DASHBOARD/GET_PAGE_DATA/FAILURE'
export const getPageDataRequest = (req) => ({ type: GET_PAGE_DATA_REQUEST, payload: req })
export const getPageDataSuccess = (res) => ({ type: GET_PAGE_DATA_SUCCESS, payload: res })
export const getPageDataFailure = (err) => ({ type: GET_PAGE_DATA_FAILURE, payload: err })
export const getPageData = () => async (dispatch, getState) => {
  try {
    dispatch(getPageDataRequest())
    const state = getState()
    const token = userTokenSelector()(state)
    const profile = await backendApi.getDashboardData(token)
    dispatch(getPageDataSuccess({ profile }))
  } catch (err) {
    dispatch(getPageDataFailure(err))
  }
}
