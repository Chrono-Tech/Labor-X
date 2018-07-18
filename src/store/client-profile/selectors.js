// @flow
import { createSelector } from "reselect"
import ProfileClientModel from "../../api/backend/model/ProfileClientModel"


export const getState = state => state.clientProfile



export const getClientProfileInitialValues = (profile: ProfileClientModel) => {
  const clientProfile = profile.submitted || profile.approved || {}
  return clientProfile
}
