import {getLastBlockNumber} from "./selectors";
import {currentAddressSelector, } from "src/store";

import {web3Selector} from "../ethereum/selectors";
import * as web3Api from './../../api/web3'

export const SELECT_INITIAL_PROPS_REQUEST = 'MY_WALLET/SELECT_INITIAL_PROPS/REQUEST'
export const SELECT_INITIAL_PROPS_SUCCESS = 'MY_WALLET/SELECT_INITIAL_PROPS/SUCCESS'
export const SELECT_INITIAL_PROPS_FAILURE = 'MY_WALLET/SELECT_INITIAL_PROPS/FAILURE'
export const selectInitialPropsRequest = (req) => ({ type: SELECT_INITIAL_PROPS_REQUEST, payload: req })
export const selectInitialPropsSuccess = (res) => ({ type: SELECT_INITIAL_PROPS_SUCCESS, payload: res })
export const selectInitialPropsFailure = (err) => ({ type: SELECT_INITIAL_PROPS_FAILURE, payload: err })
export const selectInitialProps = () => async (dispatch, getState) => {
  try {
    dispatch(selectInitialPropsRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const lastBlockNumber = 2068
    const userAddress = currentAddressSelector()(state)
    const selectTransactionLogsResults = await web3Api.selectTransactionLogs(web3, userAddress, lastBlockNumber)
    dispatch(selectInitialPropsSuccess(selectTransactionLogsResults))
  } catch (err) {
    console.error(err)
    dispatch(selectInitialPropsFailure(err))
  }
}

export const SELECT_MORE_TRANSACTIONS_REQUEST = 'MY_WALLET/SELECT_MORE_TRANSACTIONS/REQUEST'
export const SELECT_MORE_TRANSACTIONS_SUCCESS = 'MY_WALLET/SELECT_MORE_TRANSACTIONS/SUCCESS'
export const SELECT_MORE_TRANSACTIONS_FAILURE = 'MY_WALLET/SELECT_MORE_TRANSACTIONS/FAILURE'
export const selectMoreTransactionsRequest = (req) => ({ type: SELECT_MORE_TRANSACTIONS_REQUEST, payload: req })
export const selectMoreTransactionsSuccess = (res) => ({ type: SELECT_MORE_TRANSACTIONS_SUCCESS, payload: res })
export const selectMoreTransactionsFailure = (err) => ({ type: SELECT_MORE_TRANSACTIONS_FAILURE, payload: err })
export const selectMoreTransactions = () => async (dispatch, getState) => {
  try {
    dispatch(selectMoreTransactionsRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const lastBlockNumber = getLastBlockNumber(state)
    const userAddress = currentAddressSelector()(state)
    const selectTransactionLogsResults = await web3Api.selectTransactionLogs(web3, userAddress, lastBlockNumber)
    dispatch(selectMoreTransactionsSuccess(selectTransactionLogsResults))
  } catch (err) {
    dispatch(selectMoreTransactionsFailure(err))
  }
}