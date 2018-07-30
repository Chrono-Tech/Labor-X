// @flow

import {
  GET_INITIAL_PROPS_REQUEST,
  GET_INITIAL_PROPS_SUCCESS,
  GET_INITIAL_PROPS_FAILURE,
} from "./actions"
import PersonModel from "../../api/backend/model/PersonModel";

interface State {
  getInitialPropsLoading: boolean;
  persons: Array<PersonModel>;
  getInitialPropsFailure: Error;
}

export const STATE: State = {
  getInitialPropsLoading: true,
  persons: [],
  getInitialPropsFailure: true,
}

export default (state: State = STATE, action) => {

  switch (action.type) {

    case GET_INITIAL_PROPS_REQUEST: return ({
      ...state,
      getInitialPropsLoading: true,
    })
    case GET_INITIAL_PROPS_SUCCESS: return ({
      ...state,
      getInitialPropsLoading: false,
      persons: action.payload.persons,
    })
    case GET_INITIAL_PROPS_FAILURE: return ({
      ...state,
      getInitialPropsLoading: false,
      getInitialPropsFailure: action.payload,
    })

    default: return ({
      ...state,
    })

  }

}
