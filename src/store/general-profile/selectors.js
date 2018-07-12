// @flow
import { createSelector } from "reselect"
import ProfileContactsModel from "../../api/backend/model/ProfileContactsModel"
import ProfilePersonalModel from "../../api/backend/model/ProfilePersonalModel"
import ProfilePassportModel from "../../api/backend/model/ProfilePassportModel"
import ProfileLocationModel from "../../api/backend/model/ProfileLocationModel"

export const getState = state => state.generalProfile
export const getAvatar = createSelector(getState, state => state.avatar)

export const getPassportAttachments = createSelector(getState, state => state.passportAttachments)
export const getLocationAttachments = createSelector(getState, state => state.locationAttachments)

export const getPersonalInitialValues = (profile: ProfilePersonalModel) => {
  const { avatar, birthDate, userName } = profile.submitted || profile.approved || {}
  return {
    avatar: avatar ? avatar.id : null,
    userName,
    birthDate: birthDate ? new Date(birthDate) : null,
  }
}

export const getContactsInitialValues = (profile: ProfileContactsModel) => {
  const { email, phone } = profile.submitted || profile.approved || {}
  return { email, phone }
}

export const getPassportInitialValues = (profile: ProfilePassportModel) => {
  const { passport, expirationDate, attachments } = profile.submitted || profile.approved || {}
  return {
    passport,
    expirationDate: expirationDate ? new Date(expirationDate) : null,
    attachments: (attachments || []).map(x => x.id),
  }
}

export const getLocationInitialValues = (profile: ProfileLocationModel) => {
  const { country, state, city, zip, addressLine1, addressLine2, attachments } = profile.submitted || profile.approved || {}
  const [ building, suit ] = (addressLine2 || '').split('|')
  return {
    country,
    state,
    city,
    zip,
    building,
    suit,
    street: addressLine1,
    attachments: (attachments || []).map(x => x.id),
  }
}

export const getOpenValidateEmailDialog = createSelector(getState, state => state.openValidateEmailDialog)
export const getOpenValidatePhoneDialog = createSelector(getState, state => state.openValidatePhoneDialog)
