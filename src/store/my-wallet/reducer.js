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
} from "./actions"

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

interface State {
  selectInitialPropsLoading: boolean;
  transactionLogs: TransactionLogs;
  selectInitialPropsFailure: Error;
  selectMoreTransactionsLoading: boolean;
  selectMoreTransactionsFailure: Error;
  lastBlockNumber: number;
}

export const STATE: State = {
  selectInitialPropsLoading: true,
  transactionLogs: {},
  selectInitialPropsFailure: null,
  selectMoreTransactionsLoading: false,
  selectMoreTransactionsFailure: null,
  lastBlockNumber: 0,
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

    default: return ({
      ...state,
    })

  }

}
