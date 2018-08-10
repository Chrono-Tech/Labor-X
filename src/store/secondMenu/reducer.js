// @flow

import {
  PERSON_PROFILE_REQUEST,
  PERSON_PROFILE_SUCCESS,
  PERSON_PROFILE_FAILURE,
} from "./actions"

interface State {
  personProfileLoading: boolean;
  personProfile: Object;
  personProfileFailure: Error;
}

export const STATE: State = {
  personProfileLoading: true,
  personProfile: null,
  personProfileFailure: true,
}

export default (state: State = STATE, action) => {

  switch (action.type) {

    case PERSON_PROFILE_REQUEST: return ({
      ...state,
      personProfileLoading: true,
    })
    case PERSON_PROFILE_SUCCESS: return ({
      ...state,
      personProfileLoading: false,
      personProfile: action.payload.personProfile,
    })
    case PERSON_PROFILE_FAILURE: return ({
      ...state,
      personProfileLoading: false,
      personProfileFailure: action.payload,
    })
    
    default: return ({
      ...state,
    })

  }
}
