import PropTypes from 'prop-types'
import ProfileClientModel from "../../api/backend/model/ProfileClientModel"
import {

  CLIENT_PROFILE_REVIEW_REQUEST,
  CLIENT_PROFILE_REVIEW_SUCCESS,
  CLIENT_PROFILE_REVIEW_FAILURE,

  CLIENT_PROFILE_SUBMIT_REQUEST,
  CLIENT_PROFILE_SUBMIT_SUCCESS,
  CLIENT_PROFILE_SUBMIT_FAILURE,

} from "./actions"

export const FORM_CLIENT_PROFILE = 'CLIENT_PROFILE/FORM'

export const TYPES = {

  profile: PropTypes.instanceOf(ProfileClientModel),
  reviewClientProfileLoading: PropTypes.bool,
  reviewClientProfileFailure: PropTypes.instanceOf(Error),

  submitClientProfileLoading: PropTypes.bool,
  submitClientProfileFailure: PropTypes.instanceOf(Error),

}

export const STATE = {
  profile: null,
  reviewClientProfileLoading: true,
  reviewClientProfileFailure: null,

  submitClientProfileLoading: false,
  submitClientProfileFailure: null,
}

/*eslint complexity: ["error", 44]*/
export default (state = STATE, { type, payload }) => {
  switch (type) {

    case CLIENT_PROFILE_REVIEW_REQUEST: return ({
      ...state,
      reviewClientProfileLoading: true,
    })
    case CLIENT_PROFILE_REVIEW_SUCCESS: return ({
      ...state,
      reviewClientProfileLoading: false,
      profile: payload,
    })
    case CLIENT_PROFILE_REVIEW_FAILURE: return ({
      ...state,
      reviewClientProfileLoading: false,
      reviewClientProfileFailure: payload,
    })
    
    case CLIENT_PROFILE_SUBMIT_REQUEST: return ({
      ...state,
      submitClientProfileFailure: null,
      submitClientProfileLoading: true,
    })
    case CLIENT_PROFILE_SUBMIT_SUCCESS: return ({
      ...state,
      submitClientProfileLoading: false,
      profile: payload,
    })
    case CLIENT_PROFILE_SUBMIT_FAILURE: return ({
      ...state,
      submitClientProfileLoading: false,
      submitClientProfileFailure: payload,
    })

    default: return ({
      ...state,
    })

  }
}
