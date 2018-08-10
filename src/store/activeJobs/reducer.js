// @flow

import {
  SELECT_INITIAL_PROPS_REQUEST,
  SELECT_INITIAL_PROPS_SUCCESS,
  SELECT_INITIAL_PROPS_FAILURE,
} from "./actions"

interface State {
  selectInitialPropsLoading: boolean;
  cards: Array<Object>;
  lhtUsdPrice: Number,
  selectInitialPropsFailure: Error;
}

export const STATE: State = {
  selectInitialPropsLoading: true,
  cards: [],
  lhtUsdPrice: 1,
  selectInitialPropsFailure: true,
}

export default (state: State = STATE, action) => {

  switch (action.type) {

    case SELECT_INITIAL_PROPS_REQUEST: return ({
      ...state,
      selectInitialPropsLoading: true,
    })
    case SELECT_INITIAL_PROPS_SUCCESS: return ({
      ...state,
      selectInitialPropsLoading: false,
      cards: action.payload.cards,
      lhtUsdPrice: action.payload.lhtUsdPrice,
    })
    case SELECT_INITIAL_PROPS_FAILURE: return ({
      ...state,
      selectInitialPropsLoading: false,
      selectInitialPropsFailure: action.payload,
    })

    default: return ({
      ...state,
    })

  }

}
