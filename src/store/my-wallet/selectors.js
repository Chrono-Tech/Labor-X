import { createSelector } from "reselect"
import web3 from "web3"
import BigNumber from "bignumber.js"
import { getFormValues } from "redux-form"
import {currentAddressSelector} from "src/store";
import {web3Selector} from "src/store/ethereum/selectors";
import { WITHDRAW_FORM } from './reducer'


const DECIMALS = Math.pow(10, 18)
// Data selectors

export const getState = state => state.myWallet
export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)
export const getSelectMoreTransactionsLoading = createSelector(getState, state => state.selectMoreTransactionsLoading)
export const getTransactionLogs = createSelector(getState, state => state.transactionLogs)
export const getLastBlockNumber = createSelector(getState, state => state.lastBlockNumber)
export const getOpenDepositWarningDialog = createSelector(getState, state => state.openDepositWarningDialog)
export const getOpenDepositDialog = createSelector(getState, state => state.openDepositDialog)
export const getOpenWithdrawDialog = createSelector(getState, state => state.openWithdrawDialog)
export const getOpenWithdrawConfirmDialog = createSelector(getState, state => state.openWithdrawConfirmDialog)


export const getWithdrawFormValues = state => getFormValues(WITHDRAW_FORM)(state) || {}
export const getWithdrawValues = state => getFormValues(WITHDRAW_FORM)(state) || {}
export const getEstimatedGas = createSelector(getState, state => state.estimatedGas)
export const getGasLimit = createSelector(getState, state => state.gasLimit)
// export const getGasPrice = createSelector(getState, state => state.gasPrice) // todo check why gasPrice returns 0
export const getGasPrice = createSelector(getState, state => 20000000000)
export const getBalance = createSelector(getState, state => state.balance)
export const getLhtUsdPrice = createSelector(getState, state => state.lhtUsdPrice)

export const getWithdrawTo = createSelector(getWithdrawValues, (withdrawValues) => withdrawValues.to)
export const getWithdrawValue = createSelector(getWithdrawValues, (withdrawValues) => withdrawValues.value || '0')
export const getWithdrawGas = createSelector(getWithdrawValues, (withdrawValues) => withdrawValues.gas | '0')

export const getWithdrawFee = createSelector(getEstimatedGas, getGasPrice, (estimatedGas, gasPrice) => new BigNumber(estimatedGas).multipliedBy(gasPrice).toString())
export const getWithdrawTotal = createSelector(getWithdrawValue, getWithdrawFee, (withdrawValue, withdrawFee) => new BigNumber(withdrawValue).multipliedBy(DECIMALS).plus(withdrawFee).toString())
export const getWithdrawBalanceAfter = createSelector(getBalance, getWithdrawTotal, (balance, withdrawTotal) => new BigNumber(balance).minus(withdrawTotal).toString())

// View selectors

export const getWithdrawValueView = createSelector(getWithdrawValue, (withdrawValue) => new BigNumber(withdrawValue).toFixed(4))
export const getWithdrawValueUsdView = createSelector(getWithdrawValue, getLhtUsdPrice, (withdrawValue, lhtUsdPrice) => new BigNumber(withdrawValue).multipliedBy(lhtUsdPrice).toFixed(4))

export const getWithdrawFeeView = createSelector(getWithdrawFee, (withdrawFee) => new BigNumber(withdrawFee).dividedBy(DECIMALS).toFixed(4))
export const getWithdrawFeeUsdView = createSelector(getWithdrawFee, getLhtUsdPrice, (withdrawFee, lhtUsdPrice) => new BigNumber(withdrawFee).dividedBy(DECIMALS).multipliedBy(lhtUsdPrice).toFixed(4))

export const getWithdrawTotalView = createSelector(getWithdrawTotal, (withdrawTotal) => new BigNumber(withdrawTotal).dividedBy(DECIMALS).toFixed(4))
export const getWithdrawTotalUsdView = createSelector(getWithdrawTotal, getLhtUsdPrice, (withdrawTotal, lhtUsdPrice) => new BigNumber(withdrawTotal).dividedBy(DECIMALS).multipliedBy(lhtUsdPrice).toFixed(4))

export const getWithdrawBalanceAfterView = createSelector(getWithdrawBalanceAfter, (withdrawBalanceAfter) => new BigNumber(withdrawBalanceAfter).dividedBy(DECIMALS).toFixed(4))
export const getWithdrawBalanceAfterUsdView = createSelector(getWithdrawBalanceAfter, getLhtUsdPrice, (withdrawBalanceAfter, lhtUsdPrice) => new BigNumber(withdrawBalanceAfter).dividedBy(DECIMALS).multipliedBy(lhtUsdPrice).toFixed(4))

export const getBalanceView = createSelector(getBalance, (balance) => new BigNumber(balance).dividedBy(DECIMALS).toFixed(4))
export const getBalanceUsdView = createSelector(getBalance, getLhtUsdPrice, (balance, lhtUsdPrice) => new BigNumber(balance).dividedBy(DECIMALS).multipliedBy(lhtUsdPrice).toFixed(4))



