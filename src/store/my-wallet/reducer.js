import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'

import {
  SELECT_INITIAL_PROPS_REQUEST,
  SELECT_INITIAL_PROPS_SUCCESS,
  SELECT_INITIAL_PROPS_FAILURE,

  SELECT_MORE_TRANSACTIONS_REQUEST,
  SELECT_MORE_TRANSACTIONS_SUCCESS,
  SELECT_MORE_TRANSACTIONS_FAILURE,
} from "./actions"

import type { Transaction } from "../../api/web3/model/Transaction";
import {JobModel} from "../../models";

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}


export interface TransactionHistory {
  [ day: string ]: Array<{ transaction: Transaction, job: JobModel }>
}

interface State {
  selectInitialPropsLoading: boolean;
  transactionHistory: TransactionHistory;
  selectInitialPropsFailure: Error;
  selectMoreTransactionsLoading: boolean;
  selectMoreTransactionsFailure: Error;
  blockNumber: number;
}

export const STATE: State = {
  selectInitialPropsLoading: true,
  transactionHistory: {},
  selectInitialPropsFailure: null,
  selectMoreTransactionsLoading: false,
  selectMoreTransactionsFailure: null,
  blockNumber: 0,
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
      transactionHistory: { ...state.transactionHistory, ...action.payload.transactionHistory },
      blockNumber: action.payload.blockNumber,
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
      transactionHistory: mergeWith(state.transactionHistory, action.payload.transactionHistory, customizer),
      blockNumber: action.payload.blockNumber,
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
