import { push } from 'connected-react-router'
import SubmissionError from 'redux-form/lib/SubmissionError'
import * as profileApi from 'src/api/backend'

// import {userSave} from "../user/actions";
// import {decryptWallet} from "../index";
// import {UserAccountTypesModel, WalletEntryModel} from "../../models";
// import * as backendApi from "../../api/backend";
import { walletByAddressSelector } from "src/store/wallet/selectors"
import { web3Selector } from "src/store/ethereum/selectors"
import { addressSelector } from "./selectors"
import { userSave } from "../user/actions"
import UserAccountTypesModel from "../../models/app/UserAccountTypesModel"
import { walletLoad } from "../wallet/actions"
import { WalletEntryModel, WalletModel } from "../../models"
import { SIGNIN_ERROR_MESSAGE } from "./constants"

export const RESET_STATE = 'LOGIN/RESET_STATE'
export const resetState = () => ({ type: RESET_STATE })

export const GET_INITIAL_PROPS_REQUEST = 'LOGIN/GET_INITIAL_PROPS_REQUEST'
export const GET_INITIAL_PROPS_SUCCESS = 'LOGIN/GET_INITIAL_PROPS_SUCCESS'
export const GET_INITIAL_PROPS_FAILURE = 'LOGIN/GET_INITIAL_PROPS_FAILURE'
export const getInitialPropsRequest = (req) => ({ type: GET_INITIAL_PROPS_REQUEST, payload: req })
export const getInitialPropsSuccess = (res) => ({ type: GET_INITIAL_PROPS_SUCCESS, payload: res })
export const getInitialPropsFailure = (err) => ({ type: GET_INITIAL_PROPS_FAILURE, payload: err })
export const getInitialProps = () => async (dispatch, getState) => {
  try {
    dispatch(getInitialPropsRequest())
    const state = getState()
    const address = addressSelector(state)
    const person = await profileApi.getPerson(address)
    dispatch(getInitialPropsSuccess({ person }))
  } catch (err) {
    dispatch(getInitialPropsFailure(err))
  }
}

export const SET_ADDRESS = 'LOGIN/SET_ADDRESS'
export const setAddress = (address) => ({ type: SET_ADDRESS, address })

export const SIGNIN_REQUEST = 'LOGIN/SIGNIN_REQUEST'
export const SIGNIN_SUCCESS = 'LOGIN/SIGNIN_SUCCESS'
export const SIGNIN_FAILURE = 'LOGIN/SIGNIN_FAILURE'
export const signinRequest = (req) => ({ type: SIGNIN_REQUEST, payload: req })
export const signinSuccess = (res) => ({ type: SIGNIN_SUCCESS, payload: res })
export const signinFailure = (err) => ({ type: SIGNIN_FAILURE, payload: err })
export const signin = ({ password }) => async (dispatch, getState) => {
  try {
    dispatch(signinRequest())
    const state = getState()
    const web3 = web3Selector()(state)
    const address = addressSelector(state)
    const walletEntry = walletByAddressSelector(address)(state)
    const decryptedWallet = web3.eth.accounts.wallet.decrypt(walletEntry.encrypted, password)
    const walletModel = new WalletModel({ entry: new WalletEntryModel(walletEntry), wallet: decryptedWallet })
    dispatch(walletLoad(walletModel))
    const account = decryptedWallet[0]
    const { token, profile, client, worker, recruiter } = await profileApi.signin(account)
    const accountTypes = new UserAccountTypesModel({ client: client.isRequested, worker: worker.isRequested, recruiter: recruiter.isRequested })
    dispatch(userSave({ token, profile, accountTypes, client, worker, recruiter, account }))
    dispatch(push('/dashboard'))
    dispatch(signinSuccess())
  } catch (err) {
    dispatch(signinFailure(err))
    switch (err.message) {
      case SIGNIN_ERROR_MESSAGE.WRONG_PASSWORD:
        throw new SubmissionError({ password: 'Wrong Password' })
    }
  }
}
