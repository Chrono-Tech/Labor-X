import { createSelector } from 'reselect'
import { persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import web3 from './../../api/web3'

import type Account from "../../api/web3/model/Account";
import type EncryptedAccount from "../../api/web3/model/EncryptedAccount";

interface State {
    encryptedAccounts: Array<EncryptedAccount>,
    account: Account;
}

const STATE: State = {
    encryptedAccounts: [],
    account: null,
}

export const SET_ACCOUNT = 'USER/SET_ACCOUNT'
export const setAccount = (account) => ({ type: SET_ACCOUNT, account })

export const ADD_ENCRYPTED_ACCOUNTS = 'USER/ADD_ENCRYPTED_ACCOUNTS'
export const addEncryptedAccount = (encryptedAccount) => ({ type: ADD_ENCRYPTED_ACCOUNTS, encryptedAccount })

const reducer = (state: State = STATE, action) => {
    switch (action.type) {
        case SET_ACCOUNT: return ({
            ...state,
            account: action.account,
        })
        case ADD_ENCRYPTED_ACCOUNTS: return ({
            ...state,
            encryptedAccounts: [ ...state.encryptedAccounts, action.encryptedAccount ]
        })
        default: return ({
            ...state,
        })
    }
}

export const getState = (state) => state.user
export const getAccount = createSelector(getState, (state: State) => state.account)
export const getEncryptedAccounts = createSelector(getState, (state: State) => state.encryptedAccounts)
export const getEncryptedAccount = createSelector(
    getEncryptedAccounts,
    getAccount,
    (encryptedAccounts, account) => encryptedAccounts.find(x => `0x${x.address}`.toLowerCase() === account.toLowerCase())
)

const accountTransform = createTransform(
    (inboundState) => inboundState ? inboundState.privateKey : null,
    (outboundState) => outboundState ? web3.eth.accounts.privateKeyToAccount(outboundState) : null,
    { whitelist: ['account'] }
);

const persistConfig = {
    key: 'user',
    storage,
    whitelist: ['account', 'encryptedAccounts'],
    transforms: [ accountTransform ],
}


const persistedReducer = persistReducer(persistConfig, reducer)

export default persistedReducer

