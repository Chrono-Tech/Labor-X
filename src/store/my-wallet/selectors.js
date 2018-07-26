import { createSelector } from "reselect"
import { getFormValues } from "redux-form"
import {currentAddressSelector} from "src/store";
import {web3Selector} from "src/store/ethereum/selectors";
import { WITHDRAW_FORM } from './reducer'

export const getState = state => state.myWallet
export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)
export const getSelectMoreTransactionsLoading = createSelector(getState, state => state.selectMoreTransactionsLoading)
export const getTransactionLogs = createSelector(getState, state => state.transactionLogs)
export const getLastBlockNumber = createSelector(getState, state => state.lastBlockNumber)
export const getOpenDepositDialog = createSelector(getState, state => state.openDepositDialog)
export const getOpenWithdrawDialog = createSelector(getState, state => state.openWithdrawDialog)

export const getWithdrawFormValues = state => getFormValues(WITHDRAW_FORM)(state) || {}
export const getEstimatedGas = createSelector(getState, state => state.estimatedGas)
export const getGasLimit = createSelector(getState, state => state.gasLimit)

// export const getWithdrawEstimatedFee = createSelector(
//   currentAddressSelector(),
//   getWithdrawFormValues,
//   web3Selector(),
//   (userAddress, withdrawFormValues, web3) => web3.eth.estimateGas({ from: userAddress, to: withdrawFormValues.to, value: web3.utils.toWei(withdrawFormValues.value || '0', "ether")})
// )


