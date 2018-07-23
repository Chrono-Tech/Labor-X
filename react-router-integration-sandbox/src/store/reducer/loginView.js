import { createSelector } from 'reselect'
import {getEncryptedAccount} from "./user";

interface State {
    address: string;
}

const STATE = {
    address: null,
}

export const SET_ADDRESS = 'LOGIN/SET_ADDRESS'
export const setAddress = (address) => ({ type: SET_ADDRESS, address })

export const SIGNIN_REQUEST = 'LOGIN_VIEW/SIGNIN_REQUEST'
export const SIGNIN_SUCCESS = 'LOGIN_VIEW/SIGNIN_SUCCESS'
export const SIGNIN_FAILURE = 'LOGIN_VIEW/SIGNIN_FAILURE'
export const signinRequest = () => ({ type: SIGNIN_REQUEST })
export const signinSuccess = () => ({ type: SIGNIN_SUCCESS })
export const signinFailure = () => ({ type: SIGNIN_FAILURE })
export const signin = ({ password }) => async (dispatch, getState) => {
    const state = getState()
    const address = getAddress(state)
    const encryptedAccount = getEncryptedAccountByAddress(address)(state)
}

const reducer = (state: State = STATE, action) => {
    switch (action.type) {
        case SET_ADDRESS: return ({
            ...state,
            address: action.address,
        })
        default: return ({
            ...state,
        })
    }
}

export const getState = (state) => state.loginView
export const getAddress = createSelector(getState, (state: State) => state.address)

export default reducer