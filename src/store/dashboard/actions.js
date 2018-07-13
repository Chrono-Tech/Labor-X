import { currentAddressSelector } from "src/store/wallet/selectors";
import { web3Selector } from "src/store/ethereum/selectors";

export const REVIEW_BALANCE_REQUEST = 'DASHBOARD/REVIEW_BALANCE_REQUEST'
export const REVIEW_BALANCE_SUCCESS = 'DASHBOARD/REVIEW_BALANCE_SUCCESS'
export const REVIEW_BALANCE_FAILURE = 'DASHBOARD/REVIEW_BALANCE_FAILURE'
export const reviewBalanceRequest = () => ({ type: REVIEW_BALANCE_REQUEST })
export const reviewBalanceSuccess = (results) => ({ type: REVIEW_BALANCE_SUCCESS, results })
export const reviewBalanceFailure = (failure) => ({ type: REVIEW_BALANCE_FAILURE, failure })
export const reviewBalance = () => async (dispatch, getState) => {
  try {
    dispatch(reviewBalanceRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const userAddress = currentAddressSelector()(state)
    const results = await web3.eth.getBalance(userAddress)
    dispatch(reviewBalanceSuccess(results))
  } catch (err) {
    dispatch(reviewBalanceFailure(err))
  }
}