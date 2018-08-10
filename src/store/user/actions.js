import { push } from 'connected-react-router'
import { walletLoad, walletSelect } from 'src/store/wallet/actions'

export const USER_SAVE = 'USER/SAVE'
export const userSave = (user) => ({ type: USER_SAVE, user })

export const LOGOUT_REQUEST = 'USER/LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'USER/LOGOUT_SUCCESS'
export const logoutRequest = () => ({ type: LOGOUT_REQUEST })
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS })
export const logout = () => (dispatch) => { // todo implement logout from profile service
  dispatch(logoutRequest())
  dispatch(userSave(null))
  dispatch(walletLoad(null))
  dispatch(walletSelect(null))
  dispatch(push('/'))
  dispatch(logoutSuccess())
}
