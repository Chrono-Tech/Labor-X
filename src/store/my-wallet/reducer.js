import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'

import { TransactionLogs } from "../../api/web3";

import {
  SELECT_INITIAL_PROPS_REQUEST,
  SELECT_INITIAL_PROPS_SUCCESS,
  SELECT_INITIAL_PROPS_FAILURE,
  SELECT_MORE_TRANSACTIONS_REQUEST,
  SELECT_MORE_TRANSACTIONS_SUCCESS,
  SELECT_MORE_TRANSACTIONS_FAILURE,
  SHOW_DEPOSIT_DIALOG,
  HIDE_DEPOSIT_DIALOG,
  SHOW_WITHDRAW_DIALOG,
  HIDE_WITHDRAW_DIALOG,
  ESTIMATE_GAS_REQUEST,
  ESTIMATE_GAS_SUCCESS,
  ESTIMATE_GAS_FAILURE,
} from "./actions"

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

export const WITHDRAW_FORM = 'MY_WALLET/WITHDRAW_FORM'

interface State {
  selectInitialPropsLoading: boolean;
  transactionLogs: TransactionLogs;
  selectInitialPropsFailure: Error;
  selectMoreTransactionsLoading: boolean;
  selectMoreTransactionsFailure: Error;
  lastBlockNumber: number;
  openDepositDialog: boolean;
  openWithdrawDialog: boolean;
  estimateGasLoading: boolean;
  estimatedGas: number;
  estimateGasFailure: Error;
  gasLimit: number;
}

export const STATE: State = {
  selectInitialPropsLoading: true,
  transactionLogs: {},
  selectInitialPropsFailure: null,
  selectMoreTransactionsLoading: false,
  selectMoreTransactionsFailure: null,
  lastBlockNumber: 0,
  openWithdrawDialog: false,
  estimateGasLoading: false,
  estimatedGas: 0,
  estimateGasFailure: null,
  gasLimit: null,
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
      transactionLogs: [ ...action.payload.transactionLogs ],
      lastBlockNumber: action.payload.lastBlockNumber,
      gasLimit: action.payload.gasLimit,
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

    case SHOW_DEPOSIT_DIALOG: return ({
      ...state,
      openDepositDialog: true,
    })
    case HIDE_DEPOSIT_DIALOG: return ({
      ...state,
      openDepositDialog: false,
    })

    case SHOW_WITHDRAW_DIALOG: return ({
      ...state,
      openWithdrawDialog: true,
    })
    case HIDE_WITHDRAW_DIALOG: return ({
      ...state,
      openWithdrawDialog: false,
    })

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

    default: return ({
      ...state,
    })

  }

}
