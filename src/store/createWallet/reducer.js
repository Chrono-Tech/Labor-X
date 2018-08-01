// @flow

import {
  SUBMIT_REQUEST,
  SUBMIT_SUCCESS,
  SUBMIT_FAILURE,
  RESET_STATE,
} from "./actions"

interface State {
  submitLoading: boolean;
  submitFailure: Error;
}

export const STATE: State = {
  submitLoading: false,
  submitFailure: false,
}

export default (state: State = STATE, action) => {

  switch (action.type) {

    case RESET_STATE: return ({
      ...STATE,
    })

    case SUBMIT_REQUEST: return ({
      ...state,
      submitLoading: true,
    })
    case SUBMIT_SUCCESS: return ({
      ...state,
      submitLoading: false,
    })
    case SUBMIT_FAILURE: return ({
      ...state,
      submitLoading: false,
      submitFailure: action.payload,
    })

    default: return ({
      ...state,
    })

  }

}
