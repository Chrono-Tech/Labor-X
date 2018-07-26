import { createSelector } from "reselect"
import {SELECT_BLOCKS_TAKE_DEFAULT} from "./actions";

export const getState = state => state.myWallet
export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)
export const getSelectMoreTransactionsLoading = createSelector(getState, state => state.selectMoreTransactionsLoading)
export const getTransactionLogs = createSelector(getState, state => state.transactionLogs)
export const getLastBlockNumber = createSelector(getState, state => state.lastBlockNumber)


