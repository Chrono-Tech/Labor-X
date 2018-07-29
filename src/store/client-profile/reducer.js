import {
  SELECT_INITIAL_PROPS_REQUEST,
  SELECT_INITIAL_PROPS_SUCCESS,
  SELECT_INITIAL_PROPS_FAILURE,
  SUBMIT_REQUEST,
  SUBMIT_SUCCESS,
  SUBMIT_FAILURE,
} from "./actions"

export const STATE = {

  selectInitialPropsLoading: true,
  profile: null,
  currencies: null,
  selectInitialPropsFailure: true,

  submitLoading: false,
  submitFailure: null,
}

export default (state = STATE, { type, payload }) => {
  switch (type) {

    case SELECT_INITIAL_PROPS_REQUEST: return ({
      ...state,
      selectInitialPropsLoading: true,
    })
    case SELECT_INITIAL_PROPS_SUCCESS: return ({
      ...state,
      selectInitialPropsLoading: false,
      profile: payload.profile,
      currencies: payload.currencies,
    })
    case SELECT_INITIAL_PROPS_FAILURE: return ({
      ...state,
      selectInitialPropsLoading: false,
      selectInitialPropsFailure: payload,
    })

    case SUBMIT_REQUEST: return ({
      ...state,
      submitFailure: null,
      submitLoading: true,
    })
    case SUBMIT_SUCCESS: return ({
      ...state,
      submitLoading: false,
      profile: payload,
    })
    case SUBMIT_FAILURE: return ({
      ...state,
      submitLoading: false,
      submitFailure: payload,
    })

    default: return ({
      ...state,
    })

  }
}
