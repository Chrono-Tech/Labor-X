// @flow

import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'

import { TransactionLogs } from "../../api/web3"

import {
  SELECT_INITIAL_PROPS_REQUEST,
  SELECT_INITIAL_PROPS_SUCCESS,
  SELECT_INITIAL_PROPS_FAILURE,
  SELECT_MORE_TRANSACTIONS_REQUEST,
  SELECT_MORE_TRANSACTIONS_SUCCESS,
  SELECT_MORE_TRANSACTIONS_FAILURE,
  SHOW_DEPOSIT_WARNING_DIALOG,
  HIDE_DEPOSIT_WARNING_DIALOG,
  SHOW_DEPOSIT_DIALOG,
  HIDE_DEPOSIT_DIALOG,
  SHOW_WITHDRAW_DIALOG,
  HIDE_WITHDRAW_DIALOG,
  SHOW_WITHDRAW_CONFIRM_DIALOG,
  HIDE_WITHDRAW_CONFIRM_DIALOG,
  ESTIMATE_GAS_REQUEST,
  ESTIMATE_GAS_SUCCESS,
  ESTIMATE_GAS_FAILURE,
  RESET,
} from "./actions"

function customizer (objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

interface State {
  selectInitialPropsLoading: boolean;
  transactionLogs: TransactionLogs;
  selectInitialPropsFailure: Error;
  selectMoreTransactionsLoading: boolean;
  selectMoreTransactionsFailure: Error;
  lastBlockNumber: number;
  openDepositWarningDialog: boolean;
  openDepositDialog: boolean;
  openWithdrawDialog: boolean;
  openWithdrawConfirmDialog: boolean;
  estimateGasLoading: boolean;
  estimatedGas: number;
  estimateGasFailure: Error;
  gasLimit: number;
  balance: string;
  gasPrice: string;
  lhtUsdPrice: number;
}

export const STATE: State = {
  selectInitialPropsLoading: true,
  transactionLogs: {},
  selectInitialPropsFailure: null,
  selectMoreTransactionsLoading: false,
  selectMoreTransactionsFailure: null,
  lastBlockNumber: 0,
  openDepositWarningDialog: false,
  openDepositDialog: false,
  openWithdrawDialog: false,
  openWithdrawConfirmDialog: false,
  estimateGasLoading: false,
  estimatedGas: 0,
  estimateGasFailure: null,
  gasLimit: 0,
  balance: 0,
  gasPrice: null,
  lhtUsdPrice: 0,
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
      transactionLogs: action.payload.transactionLogs,
      lastBlockNumber: action.payload.lastBlockNumber,
      gasLimit: action.payload.gasLimit,
      balance: action.payload.balance,
      gasPrice: action.payload.gasPrice,
      lhtUsdPrice: action.payload.lhtUsdPrice,
    })
    case SELECT_INITIAL_PROPS_FAILURE: return ({
      ...state,
      selectInitialPropsLoading: false,
      selectInitialPropsFailure: action.payload,
    })

    case SELECT_MORE_TRANSACTIONS_REQUEST: return ({
      ...state,
      selectMoreTransactionsLoading: true,
    })
    case SELECT_MORE_TRANSACTIONS_SUCCESS: return ({
      ...state,
      selectMoreTransactionsLoading: false,
      transactionLogs: mergeWith(state.transactionLogs, action.payload.transactionLogs, customizer),
      lastBlockNumber: action.payload.lastBlockNumber,
    })
    case SELECT_MORE_TRANSACTIONS_FAILURE: return ({
      ...state,
      selectMoreTransactionsLoading: false,
      selectMoreTransactionsFailure: action.payload,
    })

    case SHOW_DEPOSIT_WARNING_DIALOG: return ({ ...state,  openDepositWarningDialog: true })
    case HIDE_DEPOSIT_WARNING_DIALOG: return ({ ...state,  openDepositWarningDialog: false })

    case SHOW_DEPOSIT_DIALOG: return ({ ...state,  openDepositDialog: true })
    case HIDE_DEPOSIT_DIALOG: return ({ ...state,  openDepositDialog: false })

    case SHOW_WITHDRAW_DIALOG: return ({ ...state,  openWithdrawDialog: true })
    case HIDE_WITHDRAW_DIALOG: return ({ ...state,  openWithdrawDialog: false })

    case SHOW_WITHDRAW_CONFIRM_DIALOG: return ({ ...state,  openWithdrawConfirmDialog: true })
    case HIDE_WITHDRAW_CONFIRM_DIALOG: return ({ ...state, openWithdrawConfirmDialog: false })

    case ESTIMATE_GAS_REQUEST: return ({
      ...state,
      estimateGasLoading: true,
    })
    case ESTIMATE_GAS_SUCCESS: return ({
      ...state,
      estimateGasLoading: false,
      estimatedGas: action.payload,
    })
    case ESTIMATE_GAS_FAILURE: return ({
      ...state,
      estimateGasLoading: false,
      estimateGasFailure: action.payload,
    })

    case RESET: return ({
      ...STATE,
    })

    default: return ({
      ...state,
    })

  }

}
