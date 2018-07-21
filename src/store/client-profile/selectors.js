// @flow
import t from "typy"
import { CLIENT_TYPE_ORGANISATION } from 'src/models'
import VerificationRequestClientModel from "../../api/backend/model/VerificationRequestClientModel"


export const getState = state => state.clientProfile

export const getClientProfileInitialValues = (profile: ProfileClientModel) => {
  const clientProfile = profile.submitted || profile.approved || {}
  return {
    custom: {
      ...clientProfile.custom,
    },
    verifiable: {
      type: CLIENT_TYPE_ORGANISATION.name,
      ...clientProfile.verifiable,
    },
    regular: {
      ...clientProfile.regular,
    },
  }
}

export const clientProfileModelFromForm = (form) => {
  let specializations = t(form, "regular.specializations").safeObject
  if (specializations) {
    specializations = specializations.map(item => item.code)
  }
  else {
    specializations = []
  }
  let name = t(form, "verifiable.name").safeObject
  if (!name || name === "") {
    name = "_"//So that, this field is required, but the enterpreneur it field not have
  }
  const type = t(form, "verifiable.type").safeObject
  const intro = t(form, "verifiable.intro").safeObject
  const website = t(form, "verifiable.website").safeObject
  const email = t(form, "verifiable.email").safeObject
  const registered = t(form, "custom.registered").safeObject
  const currenciesKeys = t(form, "custom.currenciesKeys").safeObject
  return new VerificationRequestClientModel({
    regular: {
      specializations,
    },
    verifiable: {
      name,
      type,
      intro,
      pageBackground: null,
      website,
      email,
      attachments: [],
    },
    custom: {
      registered,
      currenciesKeys,
    },
    collaborators: [],
  })
}

