import { RELEASE_PAYMENT_AND_WITHDRAW_REQUEST, RELEASE_PAYMENT_AND_WITHDRAW_SUCCESS, RELEASE_PAYMENT_AND_WITHDRAW_FAILURE } from "./actions";

interface State {
  releasePaymentAndWithdrawLoading: boolean;
  releasePaymentAndWithdrawFailure: Error;
}

const STATE = {
  releasePaymentAndWithdrawLoading: false,
  releasePaymentAndWithdrawFailure: null,
}

const reducer = (state: State = STATE, action) => {

  switch (action.type) {

    case RELEASE_PAYMENT_AND_WITHDRAW_REQUEST: return ({
      ...state,
      releasePaymentAndWithdrawLoading: true,
    })
    case RELEASE_PAYMENT_AND_WITHDRAW_SUCCESS: return ({
      ...state,
      releasePaymentAndWithdrawLoading: false,
    })
    case RELEASE_PAYMENT_AND_WITHDRAW_FAILURE: return ({
      ...state,
      releasePaymentAndWithdrawLoading: false,
      releasePaymentAndWithdrawFailure: action.err,
    })

    default: return ({
      ...state,
    })

  }

}

export default reducer
