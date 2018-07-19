import { createSelector } from "reselect"
import {SELECT_BLOCKS_TAKE_DEFAULT} from "./actions";

export const getState = state => state.myWallet
export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)
export const getSelectMoreTransactionsLoading = createSelector(getState, state => state.selectMoreTransactionsLoading)
export const getTransactionHistory = createSelector(getState, state => state.transactionHistory)
export const getBlockNumber = createSelector(getState, state => state.blockNumber)
export const getLastBlockNumber = createSelector(getBlockNumber, state => state - SELECT_BLOCKS_TAKE_DEFAULT)


