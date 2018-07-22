import web3 from './../../api/web3'
import bip39 from 'bip39'
import { push } from 'connected-react-router'
import { createSelector } from 'reselect'

import type Account from "../../api/web3/model/Account";

export const SUBMIT_SUCCESS = 'ACCOUNT_PASSWORD/SUBMIT_SUCCESS'
export const submitSuccess = (account, mnemonic, accountTypes, password) => ({ type: SUBMIT_SUCCESS, account, mnemonic, accountTypes, password })
export const submit = ({ password, accountTypes }) => (dispatch) => {
    const mnemonic = bip39.generateMnemonic()
    const account = web3.eth.accounts.privateKeyToAccount(`0x${bip39.mnemonicToSeedHex(mnemonic)}`)
    dispatch(submitSuccess(account, mnemonic, accountTypes, password))
    dispatch(push('/copy-your-account-password'))
}

export const RESET = 'ACCOUNT_PASSWORD/RESET'
export const reset = () => ({ type: RESET })

interface State {
    account: Account;
    mnemonic: string;
    password: string;
    accountTypes: {
        isRecruiter: boolean;
        isWorker: boolean;
        isClient: boolean;
    }
}

export const STATE = {
    account: null,
    mnemonic: null,
    password: null,
    accountTypes: {
        isRecruiter: false,
        isWorker: false,
        isClient: false,
    }
}

export default (state = STATE, action) => {
    switch (action.type) {
        case SUBMIT_SUCCESS: return ({
            ...state,
            account: action.account,
            mnemonic: action.mnemonic,
            accountTypes: action.accountTypes,
            password: action.password,
        })
        case RESET: return ({
            ...STATE,
        })
        default: return ({
            ...state
        })
    }
}

export const getState = (state) => state.accountPasswordView
export const getMnemonic = createSelector(getState, (state) => state.mnemonic)
export const getAccount = createSelector(getState, (state) => state.account)
export const getAccountTypes = createSelector(getState, (state) => state.accountTypes)
export const getPassword = createSelector(getState, (state) => state.password)
