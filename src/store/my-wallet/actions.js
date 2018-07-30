import { currentAddressSelector } from "src/store"
import { web3Selector } from "src/store/ethereum/selectors"
import { signerSelector } from "src/store/wallet/selectors"
import * as web3Api from 'src/api/web3'
import * as lhtApi from 'src/api/lht'
import copyToClipboard from 'src/utils/copy-to-clipboard'
import { DIALOG_TRANSITION_DURATION } from './constants'
import { getLastBlockNumber, getWithdrawValues } from "./selectors"

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
    const lastBlockNumber = await web3.eth.getBlockNumber()
    const userAddress = currentAddressSelector()(state)
    const selectTransactionLogsResults = await web3Api.selectTransactionLogs(web3, userAddress, lastBlockNumber)
    const gasLimit = (await web3.eth.getBlock('latest')).gasLimit
    const balance = await web3.eth.getBalance(userAddress)
    const gasPrice = await web3.eth.getGasPrice()
    const lhtUsdPrice = await lhtApi.getUsdPrice()
    dispatch(selectInitialPropsSuccess({ ...selectTransactionLogsResults, gasLimit, balance, gasPrice, lhtUsdPrice }))
  } catch (err) {
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

export const SHOW_DEPOSIT_WARNING_DIALOG = 'MY_WALLET/SHOW_DEPOSIT_WARNING_DIALOG'
export const HIDE_DEPOSIT_WARNING_DIALOG = 'MY_WALLET/HIDE_DEPOSIT_WARNING_DIALOG'
export const showDepositWarningDialog = () => ({ type: SHOW_DEPOSIT_WARNING_DIALOG })
export const hideDepositWarningDialog = () => ({ type: HIDE_DEPOSIT_WARNING_DIALOG })

export const SHOW_DEPOSIT_DIALOG = 'MY_WALLET/SHOW_DEPOSIT_DIALOG'
export const HIDE_DEPOSIT_DIALOG = 'MY_WALLET/HIDE_DEPOSIT_DIALOG'
export const showDepositDialog = () => ({ type: SHOW_DEPOSIT_DIALOG })
export const hideDepositDialog = () => ({ type: HIDE_DEPOSIT_DIALOG })

export const SHOW_WITHDRAW_DIALOG = 'MY_WALLET/SHOW_WITHDRAW_DIALOG'
export const HIDE_WITHDRAW_DIALOG = 'MY_WALLET/HIDE_WITHDRAW_DIALOG'
export const showWithdrawDialog = () => ({ type: SHOW_WITHDRAW_DIALOG })
export const hideWithdrawDialog = () => ({ type: HIDE_WITHDRAW_DIALOG })

export const SHOW_WITHDRAW_CONFIRM_DIALOG = 'MY_WALLET/SHOW_WITHDRAW_CONFIRM_DIALOG'
export const HIDE_WITHDRAW_CONFIRM_DIALOG = 'MY_WALLET/HIDE_WITHDRAW_CONFIRM_DIALOG'
export const showWithdrawConfirmDialog = () => ({ type: SHOW_WITHDRAW_CONFIRM_DIALOG })
export const hideWithdrawConfirmDialog = () => ({ type: HIDE_WITHDRAW_CONFIRM_DIALOG })

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
    const { to, value, gas } = getWithdrawValues(state)
    const estimatedGas = await web3.eth.estimateGas({ from: userAddress, to, value, gas })
    dispatch(estimateGasSuccess(estimatedGas))
  } catch (err) {
    dispatch(estimateGasFailure(err))
  }
}

export const depositWarningDialogSubmit = () => async (dispatch) => {
  dispatch(hideDepositWarningDialog())
  await new Promise((resolve) => setTimeout(resolve, DIALOG_TRANSITION_DURATION))
  dispatch(showDepositDialog())
}

export const depositDialogCopyAddress = () => (dispatch, getState) => {
  const state = getState()
  const userAddress = currentAddressSelector()(state)
  copyToClipboard(userAddress)
}

export const withdrawDialogSubmit = () => (dispatch) => {
  dispatch(hideWithdrawDialog())
  dispatch(showWithdrawConfirmDialog())
}

export const WITHDRAW_CONFIRM_DIALOG_SUBMIT_REQUEST = 'MY_WALLET/WITHDRAW_CONFIRM_DIALOG_SUBMIT_REQUEST'
export const WITHDRAW_CONFIRM_DIALOG_SUBMIT_SUCCESS = 'MY_WALLET/WITHDRAW_CONFIRM_DIALOG_SUBMIT_SUCCESS'
export const WITHDRAW_CONFIRM_DIALOG_SUBMIT_FAILURE = 'MY_WALLET/WITHDRAW_CONFIRM_DIALOG_SUBMIT_FAILURE'
export const withdrawConfirmDialogSubmitRequest = (req) => ({ type: WITHDRAW_CONFIRM_DIALOG_SUBMIT_REQUEST, payload: req })
export const withdrawConfirmDialogSubmitSuccess = (res) => ({ type: WITHDRAW_CONFIRM_DIALOG_SUBMIT_SUCCESS, payload: res })
export const withdrawConfirmDialogSubmitFailure = (err) => ({ type: WITHDRAW_CONFIRM_DIALOG_SUBMIT_FAILURE, payload: err })
export const withdrawConfirmDialogSubmit = () => async (dispatch, getState) => {
  try {
    dispatch(withdrawConfirmDialogSubmitRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const signer = signerSelector()(state)
    const { to, value, gas } = getWithdrawValues(state)
    const signedTransaction = await signer.signTransaction({ to, value: web3.utils.toWei(value), gas })
    await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
    dispatch(hideWithdrawConfirmDialog())
    dispatch(withdrawConfirmDialogSubmitSuccess())
  } catch (err) {
    dispatch(withdrawConfirmDialogSubmitFailure(err))
  }
}

export const RESET = 'MY_WALLET/RESET'
export const reset = () => ({ type: RESET })