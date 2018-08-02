// @flow

import {
  RESET_STATE,
  GET_INITIAL_PROPS_REQUEST,
  GET_INITIAL_PROPS_SUCCESS,
  GET_INITIAL_PROPS_FAILURE,
  SET_ADDRESS,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
} from "./actions"
import PersonModel from "../../api/backend/model/PersonModel";

interface State {
  getInitialPropsLoading: boolean;
  person: PersonModel;
  getInitialPropsFailure: Error;
  address: string;
  signinLoading: boolean;
  signinFailure: Error;
}

export const STATE: State = {
  getInitialPropsLoading: true,
  person: null,
  getInitialPropsFailure: true,
  address: null,
  signinLoading: false,
  signinFailure: null,
}

export default (state: State = STATE, action) => {

  switch (action.type) {

    case RESET_STATE: return ({
      ...STATE,
    })

    case SET_ADDRESS: return ({
      ...state,
      address: action.address,
    })

    case GET_INITIAL_PROPS_REQUEST: return ({
      ...state,
      getInitialPropsLoading: true,
    })
    case GET_INITIAL_PROPS_SUCCESS: return ({
      ...state,
      getInitialPropsLoading: false,
      person: action.payload.person,
    })
    case GET_INITIAL_PROPS_FAILURE: return ({
      ...state,
      getInitialPropsLoading: false,
      getInitialPropsFailure: action.payload,
    })

    case SIGNIN_REQUEST: return ({
      ...state,
      signinLoading: true,
    })
    case SIGNIN_SUCCESS: return ({
      ...state,
      signinLoading: false,
    })
    case SIGNIN_FAILURE: return ({
      ...state,
      signinLoading: false,
      signinFailure: action.payload,
    })

    default: return ({
      ...state,
    })

  }

}
