// @flow

import {
  SUBMIT_WELCOME_REQUEST,
  SUBMIT_WELCOME_SUCCESS,
  SUBMIT_WELCOME_FAILURE,
  SET_MNEMONIC,
} from "./actions"

interface State {
  mnemonic: string;
  submitWelcomeLoading: boolean;
  submitWelcomeFailure: Error;
}

const STATE = {
  mnemonic: null,
  submitWelcomeLoading: false,
  submitWelcomeFailure: null,
  submitAccountPasswordLoading: true,
}

const reducer = (state: State = STATE, action) => {
  switch (action.type) {

    case SET_MNEMONIC: return ({
      ...state,
      mnemonic: action.mnemonic,
    })

    case SUBMIT_WELCOME_REQUEST: return ({
      ...state,
      submitLoading: true,
    })
    case SUBMIT_WELCOME_SUCCESS: return ({
      ...state,
      submitLoading: false,
    })
    case SUBMIT_WELCOME_FAILURE: return ({
      ...state,
      submitLoading: false,
      submitFailure: action.payload,
    })

    default: return ({
      ...state,
    })
  }
}

export default reducer
