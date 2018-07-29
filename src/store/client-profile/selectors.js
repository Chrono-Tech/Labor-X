// @flow
import { createSelector } from "reselect"
import { getFormValues } from "redux-form"
import { FORM } from "./constants"
import ProfileModel from "../../api/backend/model/ProfileModel"

export const getState = state => state.clientProfile
export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)
export const getProfile = createSelector(getState, state => state.profile)
export const getCurrencies = createSelector(getState, state => state.currencies)
export const getValidationState = createSelector(getProfile, (profile) => ProfileModel.getValidationState(profile))
export const getValidationComment = createSelector(getProfile, (profile) => ProfileModel.getValidationComment(profile))

export const getValues = (state) => getFormValues(FORM)(state) || {}
export const getType = createSelector(getValues, (values) => values.verifiable.type)
export const getStuff = createSelector(getValues, (values) => values.collaborators)

export const getInitialValues = (profile: ProfileClientModel) => {
  const { verifiable, custom, collaborators } = profile.submitted || profile.approved || {}
  return { verifiable: verifiable || {}, custom: custom || {}, collaborators: collaborators || [] }
}
