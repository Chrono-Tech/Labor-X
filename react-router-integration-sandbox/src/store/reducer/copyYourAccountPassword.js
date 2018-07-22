import { push } from 'connected-react-router'

export const submit = () => async (dispatch, getState) => {
    try {
        dispatch(push('/confirm-back-up'))
    } catch (err) {
        alert(err.message)
    }
}
