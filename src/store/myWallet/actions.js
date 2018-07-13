import * as web3Api from 'src/api/web3'
import { currentAddressSelector } from "src/store/wallet/selectors";
import { web3Selector } from "../ethereum/selectors";

export const SEARCH_TRANSACTION_REQUEST = 'MY_WALLET/REVIEW_BALANCE_REQUEST'
export const SEARCH_TRANSACTION_SUCCESS = 'MY_WALLET/REVIEW_BALANCE_SUCCESS'
export const SEARCH_TRANSACTION_FAILURE = 'MY_WALLET/REVIEW_BALANCE_FAILURE'
export const searchTransactionRequest = () => ({ type: SEARCH_TRANSACTION_REQUEST })
export const searchTransactionSuccess = (results) => ({ type: SEARCH_TRANSACTION_SUCCESS, results })
export const searchTransactionFailure = (failure) => ({ type: SEARCH_TRANSACTION_FAILURE, failure })
export const searchTransaction = () => async (dispatch, getState) => {
  try {
    dispatch(searchTransactionRequest())
    const state = getState()
    const userAddress = currentAddressSelector()(state)
    const web3 = web3Selector()(state)
    var results = [], page = 1;
    while (!results.length && page < 10) {
      results = await web3Api.searchTransaction(web3, userAddress, page)
      page++;
    }
    dispatch(searchTransactionSuccess(results))
  } catch (err) {
    dispatch(searchTransactionFailure(err))
  }
}