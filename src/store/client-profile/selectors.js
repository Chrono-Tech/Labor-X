// @flow
import { createSelector } from "reselect"
import VerificationRequestClientModel from "../../api/backend/model/VerificationRequestClientModel"


export const getState = state => state.clientProfile



export const getClientProfileInitialValues = (profile: ProfileClientModel) => {
  const clientProfile = profile.submitted || profile.approved || {}
  return clientProfile
}

export const clientProfileModelFromForm = (form) => {
  const specializations = form.regular && form.regular.specializations;
  return new VerificationRequestClientModel({
    regular: {
      specializations: [], 
    },
    verifiable: {
      name: form.verifiable && form.verifiable.name, 
      type: form.verifiable && form.verifiable.type, 
      intro: form.verifiable && form.verifiable.intro,
      pageBackground: "5b5182f9a133c20ec491f4dd",
      website: form.verifiable && form.verifiable.website,
      email: form.verifiable && form.verifiable.email,
      attachments: ["5b47edf39b1ff322944b4b3e"]
    },
    custom: null, //{
      // registered: form.custom && form.custom.registered
    // },
    collaborators: []
  })
}

