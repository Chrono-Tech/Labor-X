import { push } from 'connected-react-router'
import * as profileApi from 'src/api/backend'
import { walletsListSelector } from "src/store/wallet/selectors"
import { setAddress as setLoginAddress } from "src/store/login/actions"

export const GET_INITIAL_PROPS_REQUEST = 'MY_ACCOUNTS/GET_INITIAL_PROPS/REQUEST'
export const GET_INITIAL_PROPS_SUCCESS = 'MY_ACCOUNTS/GET_INITIAL_PROPS/SUCCESS'
export const GET_INITIAL_PROPS_FAILURE = 'MY_ACCOUNTS/GET_INITIAL_PROPS/FAILURE'
export const getInitialPropsRequest = (req) => ({ type: GET_INITIAL_PROPS_REQUEST, payload: req })
export const getInitialPropsSuccess = (res) => ({ type: GET_INITIAL_PROPS_SUCCESS, payload: res })
export const getInitialPropsFailure = (err) => ({ type: GET_INITIAL_PROPS_FAILURE, payload: err })
export const getInitialProps = () => async (dispatch, getState) => {
  try {
    dispatch(getInitialPropsRequest())
    const state = getState()
    const wallets = walletsListSelector(state)
    const addresses = wallets.map((x) => `0x${x.encrypted[0].address}`)
    const persons = await profileApi.getPersons(addresses)
    const personsByAddress = persons.reduce((result, x) => ({ ...result, [ x.address ]: x }), {})
    const accounts = addresses.map((x) => ({ address: x, ...personsByAddress[x] }))
    dispatch(getInitialPropsSuccess({ accounts }))
  } catch (err) {
    dispatch(getInitialPropsFailure(err))
  }
}

export const selectAccount = (address) => (dispatch) => {
  dispatch(setLoginAddress(address))
  dispatch(push('/login'))
}