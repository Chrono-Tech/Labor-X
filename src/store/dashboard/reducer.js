import PropTypes from 'prop-types'
import ProfileModel from 'src/api/backend/model/ProfileModel'
import ProfileClientModel from 'src/api/backend/model/ProfileClientModel'
import ProfileWorkerModel from 'src/api/backend/model/ProfileWorkerModel'
import ProfileRecruiterModel from 'src/api/backend/model/ProfileRecruiterModel'
import {

  GET_PAGE_DATA_REQUEST,
  GET_PAGE_DATA_SUCCESS,
  GET_PAGE_DATA_FAILURE,

} from "./actions"

export const FORM_PERSONAL = 'GENERAL_PROFILE/FORM/PERSONAL'
export const FORM_CONTACTS = 'GENERAL_PROFILE/FORM/CONTACTS'
export const FORM_PASSPORT = 'GENERAL_PROFILE/FORM/PASSPORT'
export const FORM_LOCATION = 'GENERAL_PROFILE/FORM/LOCATION'
export const FORM_CONTACTS_EMAIL_CODE = 'GENERAL_PROFILE/FORM/CONTACTS_EMAIL_CODE'
export const FORM_CONTACTS_PHONE_CODE = 'GENERAL_PROFILE/FORM/CONTACTS_PHONE_CODE'

export const TYPES = {
  pageDataLoading: PropTypes.bool,
  pageDataFailure: PropTypes.instanceOf(Error),
  pageData: {
    profile:  {
      profile: ProfileModel,
      client: ProfileClientModel,
      worker: ProfileWorkerModel,
      recruiter: ProfileRecruiterModel,
    },
  },
}

export const STATE = {
  pageData: null,
  pageDataLoading: true,
  pageDataFailure: null,
}

export default (state = STATE, { type, payload }) => {
  switch (type) {
    case GET_PAGE_DATA_REQUEST: return ({
      ...state,
      pageDataLoading: true,
    })
    case GET_PAGE_DATA_SUCCESS: return ({
      ...state,
      pageDataLoading: false,
      pageData: payload,
    })
    case GET_PAGE_DATA_FAILURE: return ({
      ...state,
      pageDataLoading: false,
      pageDataFailure: payload,
    })

    default: return ({
      ...state,
    })
  }
}
