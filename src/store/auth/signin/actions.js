import { push } from 'connected-react-router'

import * as profileApi from 'src/api/backend'
import { walletSelect, walletLoad } from "src/store/wallet/actions"
import { walletEntriesSelector, selectedWalletSelector } from "src/store/wallet/selectors"
import { web3Selector } from "src/store/ethereum/selectors"
import WalletModel from "src/models/wallets/WalletModel"
import { userSave } from "src/store/user/actions"
import UserModel from "src/models/app/UserModel"

import { formValuesSelector } from "./selectors"

export const selectWallet = (index) => (dispatch, getState) => {
  const state = getState()
  const walletEntries = walletEntriesSelector(state)
  const walletEntry = walletEntries[index]
  dispatch(walletSelect(walletEntry))
  dispatch(push('/auth/signin/login'))
}

export const SUBMIT_REQUEST = 'AUTH/SIGNIN/SUBMIT_REQUEST'
export const SUBMIT_SUCCESS = 'AUTH/SIGNIN/SUBMIT_SUCCESS'
export const SUBMIT_FAILURE = 'AUTH/SIGNIN/SUBMIT_FAILURE'
export const submitRequest = (req) => ({ type: SUBMIT_REQUEST, payload: req })
export const submitSuccess = (res) => ({ type: SUBMIT_SUCCESS, payload: res })
export const submitFailure = (err) => ({ type: SUBMIT_FAILURE, payload: err })
export const submit = () => async (dispatch, getState) => {
  try {
    dispatch(submitRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const { password } = formValuesSelector(state)
    const walletEntry = selectedWalletSelector(state)
    const wallet = web3.eth.accounts.wallet.decrypt(walletEntry.encrypted, password)
    const walletModel = new WalletModel({ entry: walletEntry, wallet })
    dispatch(walletLoad(walletModel))
    const account = wallet[0]
    const { token, profile, client, worker, recruiter } = await profileApi.signin(account)
    const user = UserModel.fromJson({ token, profile, client, worker, recruiter })
    dispatch(userSave(user))
    dispatch(push('/dashboard'))
    dispatch(submitSuccess())
  } catch (err) {
    dispatch(submitFailure(err))
  }
}
