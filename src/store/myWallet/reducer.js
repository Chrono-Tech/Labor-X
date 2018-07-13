import {
  SEARCH_TRANSACTION_REQUEST,
  SEARCH_TRANSACTION_SUCCESS,
  SEARCH_TRANSACTION_FAILURE,
} from "./actions";

interface State {
  searchTransactionLoading: boolean;
  balance: string;
  searchTransactionFailure: Error;
}

const STATE = {
  searchTransactionLoading: true,
  transactions: null,
  searchTransactionFailure: null,
}

const reducer = (state: State = STATE, action) => {

  switch (action.type) {

    case SEARCH_TRANSACTION_REQUEST: return ({
      ...state,
      searchTransactionLoading: true,
    })
    case SEARCH_TRANSACTION_SUCCESS: return ({
      ...state,
      searchTransactionLoading: false,
      transactions: action.results,
    })
    case SEARCH_TRANSACTION_FAILURE: return ({
      ...state,
      searchTransactionLoading: false,
      searchTransactionFailure: action.failure,
    })

    default: return ({
      ...state,
    })

  }

}

export default reducer
