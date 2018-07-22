import { push } from 'connected-react-router'
import {setAccount as setUserAccount} from "./user";

export const logout = () => async (dispatch) => {
    try {
        dispatch(setUserAccount(null))
        dispatch(push('/'))
    } catch (err) {
        alert(err.message)
    }
}
