import {getLastBlockNumber, getWithdrawFormValues} from "./selectors";
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
    const gasLimit = (await web3.eth.getBlock('latest')).gasLimit
    dispatch(selectInitialPropsSuccess({ ...selectTransactionLogsResults, gasLimit }))
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

export const SHOW_DEPOSIT_DIALOG = 'MY_WALLET/SHOW_DEPOSIT_DIALOG'
export const HIDE_DEPOSIT_DIALOG = 'MY_WALLET/HIDE_DEPOSIT_DIALOG'
export const showDepositDialog = () => ({ type: SHOW_DEPOSIT_DIALOG })
export const hideDepositDialog = () => ({ type: HIDE_DEPOSIT_DIALOG })

export const SHOW_WITHDRAW_DIALOG = 'MY_WALLET/SHOW_WITHDRAW_DIALOG'
export const HIDE_WITHDRAW_DIALOG = 'MY_WALLET/HIDE_WITHDRAW_DIALOG'
export const showWithdrawDialog = () => ({ type: SHOW_WITHDRAW_DIALOG })
export const hideWithdrawDialog = () => ({ type: HIDE_WITHDRAW_DIALOG })

export const ESTIMATE_GAS_REQUEST = 'MY_WALLET/ESTIMATE_GAS_REQUEST'
export const ESTIMATE_GAS_SUCCESS = 'MY_WALLET/ESTIMATE_GAS_SUCCESS'
export const ESTIMATE_GAS_FAILURE = 'MY_WALLET/ESTIMATE_GAS_FAILURE'
export const estimateGasRequest = (req) => ({ type: ESTIMATE_GAS_REQUEST, payload: req })
export const estimateGasSuccess = (res) => ({ type: ESTIMATE_GAS_SUCCESS, payload: res })
export const estimateGasFailure = (err) => ({ type: ESTIMATE_GAS_FAILURE, payload: err })
export const estimateGas = () => async (dispatch, getState) => {
  try {
    dispatch(estimateGasRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const userAddress = currentAddressSelector()(state)
    const { to, value, gas } = getWithdrawFormValues(state)
    console.log({ to, value, gas })
    const estimatedGas = await web3.eth.estimateGas({ from: userAddress, to, value, gas })
    dispatch(estimateGasSuccess(estimatedGas))
  } catch (err) {
    dispatch(estimateGasFailure(err))
  }
}