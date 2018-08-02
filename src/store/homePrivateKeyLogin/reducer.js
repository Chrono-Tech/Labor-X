// @flow

import {
  SUBMIT_REQUEST,
  SUBMIT_SUCCESS,
  SUBMIT_FAILURE,
  RESET_STATE,
  SHOW_ACCOUNT_404_DIALOG,
  HIDE_ACCOUNT_404_DIALOG,
} from "./actions"

interface State {
  submitLoading: boolean;
  submitFailure: Error;
  openAccount404Dialog: boolean;
}

export const STATE: State = {
  submitLoading: false,
  submitFailure: false,
  openAccount404Dialog: false,
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

    case SHOW_ACCOUNT_404_DIALOG: return ({
      ...state,
      openAccount404Dialog: true,
    })
    case HIDE_ACCOUNT_404_DIALOG: return ({
      ...state,
      openAccount404Dialog: true,
    })

    default: return ({
      ...state,
    })

  }

}
