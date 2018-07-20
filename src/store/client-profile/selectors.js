// @flow
import { createSelector } from "reselect"
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
      ...clientProfile.verifiable
    }
  }
}

export const clientProfileModelFromForm = (form) => {
  const specializations = form.regular && form.regular.specializations;
  const name = form.verifiable && form.verifiable.name;
  const type = form.verifiable && form.verifiable.type;
  const intro = form.verifiable && form.verifiable.intro;
  const website = form.verifiable && form.verifiable.website;
  const email = form.verifiable && form.verifiable.email;
  const registered = form.custom && form.custom.registered;
  const currenciesKeys = form.custom && form.custom.currenciesKeys;
  return new VerificationRequestClientModel({
    regular: {
      specializations: specializations ? specializations: [],
    },
    verifiable: {
      name: name, // ? name : "_", //So that, this field is required, but the enterpreneur it field not have
      type: type,
      intro: intro,
      pageBackground: null,
      website: website,
      email: email,
      attachments: []
    },
    custom: {
      registered: registered,
      currenciesKeys
    },
    collaborators: []
  })
}

