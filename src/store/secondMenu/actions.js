import { currentAddressSelector } from "src/store"
import * as profileApi from 'src/api/backend'

export const PERSON_PROFILE_REQUEST = 'SECOND_MENU/PERSON_PROFILE/REQUEST'
export const PERSON_PROFILE_SUCCESS = 'SECOND_MENU/PERSON_PROFILE/SUCCESS'
export const PERSON_PROFILE_FAILURE = 'SECOND_MENU/PERSON_PROFILE/FAILURE'
export const personProfileRequest = (req) => ({ type: PERSON_PROFILE_REQUEST, payload: req })
export const personProfileSuccess = (res) => ({ type: PERSON_PROFILE_SUCCESS, payload: res })
export const personProfileFailure = (err) => ({ type: PERSON_PROFILE_FAILURE, payload: err })
export const personProfile = () => async (dispatch, getState) => {
  try {
    dispatch(personProfileRequest())
    const state = getState()
    const userAddress = currentAddressSelector()(state)
    const personProfile = await profileApi.getPerson(userAddress);
    dispatch(personProfileSuccess({ personProfile }))
  } catch (err) {
    dispatch(personProfileFailure(err))
  }
}
