import { push } from 'connected-react-router'
import {setAddress} from "./loginView";

export const select = (address) => (dispatch) => {
    try {
        dispatch(setAddress(address))
        dispatch(push('/login'))
    } catch (err) {
        alert(err.message)
    }
}
