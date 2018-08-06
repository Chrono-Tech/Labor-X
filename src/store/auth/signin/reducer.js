// @flow

import {
  SUBMIT_REQUEST,
  SUBMIT_SUCCESS,
  SUBMIT_FAILURE,
} from "./actions"

interface State {
  submitLoading: boolean;
  submitFailure: Error;
}

const STATE = {
  submitLoading: false,
  submitFailure: null,
}

const reducer = (state: State = STATE, action) => {
  switch (action.type) {
    case SUBMIT_REQUEST: return ({ ...state, submitLoading: true })
    case SUBMIT_SUCCESS: return ({ ...state, submitLoading: false })
    case SUBMIT_FAILURE: return ({ ...state, submitLoading: false, submitFailure: action.payload })
    default: return ({ ...state })
  }
}

export default reducer
