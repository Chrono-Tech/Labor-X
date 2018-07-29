import * as backendApi from "../../api/backend"

export const PROFILE_ADD = 'PROFILE_ADD'

export const addProfile = (address, profile) => ({ type: PROFILE_ADD, payload: { address, profile } })
export const loadProfileByAddress = (address) => async (dispatch) => {
  const profile = await backendApi.getProfile(address)
  if (profile) {
    dispatch(addProfile(address, profile))
  }
}
