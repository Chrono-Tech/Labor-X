import { push } from 'connected-react-router'

import * as profileApi from './../../api/profile'
import { getAccount, getAccountTypes, getPassword } from "./accountPasswordView";

import { setAccount as setUserAccount, addEncryptedAccount } from './user'

export const submit = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const account = getAccount(state)
        const accountTypes = getAccountTypes(state)
        await profileApi.signin(account, accountTypes)
        const password = getPassword(state)
        const encryptedAccount = account.encrypt(password)
        dispatch(addEncryptedAccount(encryptedAccount))
        dispatch(setUserAccount(account))
        dispatch(push('/your-wallet-file'))
    } catch (err) {
        alert(err.message)
    }
}
