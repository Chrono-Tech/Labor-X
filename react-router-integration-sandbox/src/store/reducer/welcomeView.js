import { push } from 'connected-react-router'
import {reset as resetAccountPasswordView} from "./accountPasswordView";

export const done = () => (dispatch) => {
    try {
        dispatch(resetAccountPasswordView())
        dispatch(push('/manage'))
    } catch (err) {
        alert(err.message)
    }
}
