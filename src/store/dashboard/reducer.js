import { REVIEW_BALANCE_FAILURE, REVIEW_BALANCE_REQUEST, REVIEW_BALANCE_SUCCESS } from "./actions";

interface State {
  reviewBalanceLoading: boolean;
  balance: string;
  reviewBalanceFailure: Error;
}

const STATE = {
  reviewBalanceLoading: true,
  balance: null,
  reviewBalanceFailure: null,
}

const reducer = (state: State = STATE, action) => {

  switch (action.type) {

    case REVIEW_BALANCE_REQUEST: return ({
      ...state,
      reviewBalanceLoading: true,
    })
    case REVIEW_BALANCE_SUCCESS: return ({
      ...state,
      reviewBalanceLoading: false,
      balance: action.results,
    })
    case REVIEW_BALANCE_FAILURE: return ({
      ...state,
      reviewBalanceLoading: false,
      reviewBalanceFailure: action.failure,
    })

    default: return ({
      ...state,
    })

  }

}

export default reducer
