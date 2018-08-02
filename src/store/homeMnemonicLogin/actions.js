import { push } from 'connected-react-router'
import hdkey from 'ethereumjs-wallet/hdkey'
import bip39 from 'bip39'

import * as profileApi from 'src/api/backend'
import { web3Selector } from "src/store/ethereum/selectors"
import {privateKeySelector} from "./selectors";

import { setPrivateKey as setCreateWalletPrivateKey } from 'src/store/createWallet/actions'

export const RESET_STATE = 'HOME_MNEMONIC_LOGIN/RESET_STATE'
export const resetState = () => ({ type: RESET_STATE })

export const SHOW_ACCOUNT_404_DIALOG = 'HOME_MNEMONIC_LOGIN/SHOW_ACCOUNT_404_DIALOG'
export const showAccount404Dialog = () => ({ type: SHOW_ACCOUNT_404_DIALOG })
export const HIDE_ACCOUNT_404_DIALOG = 'HOME_MNEMONIC_LOGIN/HIDE_ACCOUNT_404_DIALOG'
export const hideAccount404Dialog = () => ({ type: HIDE_ACCOUNT_404_DIALOG })

export const SUBMIT_REQUEST = 'HOME_MNEMONIC_LOGIN/SUBMIT_REQUEST'
export const SUBMIT_SUCCESS = 'HOME_MNEMONIC_LOGIN/SUBMIT_SUCCESS'
export const SUBMIT_FAILURE = 'HOME_MNEMONIC_LOGIN/SUBMIT_FAILURE'
export const submitRequest = (req) => ({ type: SUBMIT_REQUEST, payload: req })
export const submitSuccess = (res) => ({ type: SUBMIT_SUCCESS, payload: res })
export const submitFailure = (err) => ({ type: SUBMIT_FAILURE, payload: err })
export const submit = () => async (dispatch, getState) => {
  try {
    dispatch(submitRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const mnemonic = mnemonicSelector(state)
    const seed = bip39.mnemonicToSeed(mnemonic)
    const hdWallet = hdkey.fromMasterSeed(seed)
    const wallet = hdWallet.derivePath(`m/44'/60'/0'/0/0`).getWallet()
    const privateKey = `0x${wallet.getPrivateKey().toString('hex')}`
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    const person = await profileApi.getPerson(account.address)
    if (person) {
      dispatch(setCreateWalletPrivateKey(privateKey))
      dispatch(push('/create-wallet'))
    } else {
      dispatch(showAccount404Dialog())
    }
    dispatch(submitSuccess())
  } catch (err) {
    dispatch(submitFailure(err))
  }
}

