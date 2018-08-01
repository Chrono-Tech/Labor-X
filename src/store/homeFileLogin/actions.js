import { push } from 'connected-react-router'

import readFile from "src/utils/readFile";
import {walletAdd} from "src/store/wallet/actions";
import {walletSelector} from "./selectors";
import {WalletEntryModel} from "../../models";
import {setAddress as setLoginAddress} from "src/store/login/actions";
import * as profileApi from "../../api/backend";
import {showAccount404Dialog} from "../homePrivateKeyLogin/actions";
import {setPrivateKey as setCreateWalletPrivateKey} from "../createWallet/actions";
import {privateKeySelector} from "../homePrivateKeyLogin/selectors";
import {web3Selector} from "../ethereum/selectors";


export const UPDATE_FILE_REQUEST = 'HOME_FILE_LOGIN/UPDATE_FILE_REQUEST'
export const UPDATE_FILE_SUCCESS = 'HOME_FILE_LOGIN/UPDATE_FILE_SUCCESS'
export const UPDATE_FILE_FAILURE = 'HOME_FILE_LOGIN/UPDATE_FILE_FAILURE'
export const updateFileRequest = (req) => ({ type: UPDATE_FILE_REQUEST, payload: req })
export const updateFileSuccess = (res) => ({ type: UPDATE_FILE_SUCCESS, payload: res })
export const updateFileFailure = (err) => ({ type: UPDATE_FILE_FAILURE, payload: err })
export const updateFile = (file) => async (dispatch) => {
  try {
    dispatch(updateFileRequest())
    const fileContent = await readFile(file)
    const wallet = JSON.parse(fileContent)
    dispatch(updateFileSuccess({ wallet }))
  } catch (err) {
    dispatch(updateFileFailure(err))
  }
}

export const DELETE_FILE = 'HOME_FILE_LOGIN/DELETE_FILE'
export const deleteFile = () => ({ type: DELETE_FILE })

export const SUBMIT_REQUEST = 'HOME_FILE_LOGIN/SUBMIT_REQUEST'
export const SUBMIT_SUCCESS = 'HOME_FILE_LOGIN/SUBMIT_SUCCESS'
export const SUBMIT_FAILURE = 'HOME_FILE_LOGIN/SUBMIT_FAILURE'
export const submitRequest = (req) => ({ type: SUBMIT_REQUEST, payload: req })
export const submitSuccess = (res) => ({ type: SUBMIT_SUCCESS, payload: res })
export const submitFailure = (err) => ({ type: SUBMIT_FAILURE, payload: err })
export const submit = () => (dispatch, getState) => {
  try {
    dispatch(submitRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const encryptedWallet = walletSelector(state)

  //   // const account = web3.eth.accounts.privateKeyToAccount(privateKey)
  //   const person = await profileApi.getPerson(account.address)
  //   if (person) {
  //     dispatch(setCreateWalletPrivateKey(privateKey))
  //     dispatch(push('/create-wallet'))
  //   } else {
  //     dispatch(showAccount404Dialog())
  //   }
  //   dispatch(submitSuccess())
  // } catch (err) {
  //   dispatch(submitFailure(err))
  }
  // try {
  //
  // } catch (err) {
  //
  // }
  // const state = getState()
  // const encryptedWallet = walletSelector(state)
  // const walletEntry =  new WalletEntryModel({ name: 'My Account', encrypted: encryptedWallet })
  // dispatch(walletAdd(walletEntry))
  // dispatch(setLoginAddress(`0x${encryptedWallet[0].address}`))
  // dispatch(push(`/login`))
}
