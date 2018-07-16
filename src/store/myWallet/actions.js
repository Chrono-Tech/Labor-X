import * as web3Api from 'src/api/web3'
import { currentAddressSelector } from "src/store/wallet/selectors";
import { web3Selector } from "../ethereum/selectors";

import PaymentGatewayJonInterface from '@laborx/sc-abi/build/contracts/PaymentGateway.json'
import BalanceHolderJonInterface from '@laborx/sc-abi/build/contracts/BalanceHolder.json'

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

    // var results = [], page = 1;
    // while (!results.length && page < 10) {
    //   results = await web3Api.searchTransaction(web3, userAddress, page)
    //   page++;
    // }
    //
    // var results2 = [], page = 1;
    // while (!results2.length && page < 10) {
    //   results2 = await web3Api.searchTransaction(web3, PaymentGatewayJonInterface.networks['88'].address, page)
    //   page++;
    // }

    var results3 = [], page = 1;
    while (!results3.length && page < 20) {
      results3 = await web3Api.searchTransaction(web3, '0xc52a768b279b8a612d179edf6974adc37ddd5d97', page)
      page++;
    }

    debugger

    dispatch(searchTransactionSuccess(
      // results.concat(results2).concat(results3))
      results3
    ))
  } catch (err) {
    dispatch(searchTransactionFailure(err))
  }
}