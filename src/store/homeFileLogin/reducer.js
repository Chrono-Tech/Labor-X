// @flow

import {
  UPDATE_FILE_REQUEST,
  UPDATE_FILE_SUCCESS,
  UPDATE_FILE_FAILURE,
  DELETE_FILE,
} from "./actions"

interface State {
  updateFileLoading: boolean;
  wallet: Object;
  updateFileFailure: Error;
}

export const STATE: State = {
  updateFileLoading: false,
  wallet: null,
  updateFileFailure: null,
}

export default (state: State = STATE, action) => {

  switch (action.type) {

    case UPDATE_FILE_REQUEST: return ({
      ...state,
      updateFileLoading: true,
    })
    case UPDATE_FILE_SUCCESS: return ({
      ...state,
      updateFileLoading: false,
      wallet: action.payload.wallet
    })
    case UPDATE_FILE_FAILURE: return ({
      ...state,
      updateFileLoading: false,
      updateFileFailure: action.payload
    })

    case DELETE_FILE: return ({
      ...state,
      wallet: null,
      updateFileFailure: null,
    })

    default: return ({
      ...state,
    })

  }

}
