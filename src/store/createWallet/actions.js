import { push } from 'connected-react-router'

import * as profileApi from 'src/api/backend'
import { web3Selector } from "src/store/ethereum/selectors"
import {privateKeySelector} from "./selectors";

export const SET_PRIVATE_KEY = 'CREATE_WALLET/SET_PRIVATE_KEY'
export const setPrivateKey = (privateKey) => ({ type: SET_PRIVATE_KEY, privateKey })

export const RESET_STATE = 'HOME_PRIVATE_KEY_LOGIN/RESET_STATE'
export const resetState = () => ({ type: RESET_STATE })

export const SHOW_ACCOUNT_404_DIALOG = 'HOME_PRIVATE_KEY_LOGIN/SHOW_ACCOUNT_404_DIALOG'
export const showAccount404Dialog = () => ({ type: SHOW_ACCOUNT_404_DIALOG })
export const HIDE_ACCOUNT_404_DIALOG = 'HOME_PRIVATE_KEY_LOGIN/HIDE_ACCOUNT_404_DIALOG'
export const hideAccount404Dialog = () => ({ type: HIDE_ACCOUNT_404_DIALOG })

export const SUBMIT_REQUEST = 'HOME_PRIVATE_KEY_LOGIN/SUBMIT_REQUEST'
export const SUBMIT_SUCCESS = 'HOME_PRIVATE_KEY_LOGIN/SUBMIT_SUCCESS'
export const SUBMIT_FAILURE = 'HOME_PRIVATE_KEY_LOGIN/SUBMIT_FAILURE'
export const updateFileRequest = (req) => ({ type: SUBMIT_REQUEST, payload: req })
export const updateFileSuccess = (res) => ({ type: SUBMIT_SUCCESS, payload: res })
export const updateFileFailure = (err) => ({ type: SUBMIT_FAILURE, payload: err })
export const submit = () => async (dispatch, getState) => {
  try {
    dispatch(updateFileRequest())
    const state = getState()
    const privateKey = privateKeySelector(state)
    const web3 = web3Selector()(state)
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    const person = await profileApi.getPerson(account.address)
    if (person) {
      // dispatch(setCreateWalletPrivateKey(privateKey))
      dispatch(push('/create-wallet'))
    } else {
      dispatch(showAccount404Dialog())
    }
    dispatch(updateFileSuccess())
  } catch (err) {
    dispatch(updateFileFailure(err))
  }
}

