import { web3Selector } from "src/store/ethereum/selectors";
import { daoByType } from "../daos/selectors";
import { signerSelector } from "../wallet/selectors";
import { executeTransaction } from "../ethereum/actions";

export const RELEASE_PAYMENT_AND_WITHDRAW_REQUEST = 'COMPLETED_JOBS/RELEASE_PAYMENT_AND_WITHDRAW_REQUEST'
export const RELEASE_PAYMENT_AND_WITHDRAW_SUCCESS = 'COMPLETED_JOBS/RELEASE_PAYMENT_AND_WITHDRAW_SUCCESS'
export const RELEASE_PAYMENT_AND_WITHDRAW_FAILURE = 'COMPLETED_JOBS/RELEASE_PAYMENT_AND_WITHDRAW_FAILURE'
export const releasePaymentAndWithdrawRequest = () => ({ type: RELEASE_PAYMENT_AND_WITHDRAW_REQUEST })
export const releasePaymentAndWithdrawSuccess = (results) => ({ type: RELEASE_PAYMENT_AND_WITHDRAW_SUCCESS, results })
export const releasePaymentAndWithdrawFailure = (failure) => ({ type: RELEASE_PAYMENT_AND_WITHDRAW_FAILURE, failure })
export const releasePaymentAndWithdraw = (id) => async (dispatch, getState) => {
  try {
    dispatch(releasePaymentAndWithdrawRequest())
    const state = getState()
    const JobController = daoByType('JobController')(state)
    const PaymentGateway = daoByType('PaymentGateway')(state)
    const signer = signerSelector()(state)
    const web3 = web3Selector()(state)
    const releasePaymentTx = JobController.createReleasePaymentTx(signer.address, id)
    const releasePaymentRes = await dispatch(executeTransaction({ tx: releasePaymentTx, web3, signer }))
    const paymentGatewayBalance = await PaymentGateway.getBalance(signer.address)
    debugger
    const withdrawTx = PaymentGateway.createWithdrawTx(signer.address, paymentGatewayBalance)
    const withdrawRes = await dispatch(executeTransaction({ tx: withdrawTx, web3, signer }))
    dispatch(releasePaymentAndWithdrawSuccess({ releasePaymentRes, paymentGatewayBalance, withdrawRes }))
  } catch (err) {
    dispatch(releasePaymentAndWithdrawFailure(err))
  }
}