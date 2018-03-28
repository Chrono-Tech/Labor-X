export const LOGIN_SIGN_IN = 'login/signIn'
export const LOGIN_SELECT_OPTION = 'login/selectOption'

// TODO @dkchv: !!! for tests, remove
export const signIn = () => (dispatch) => {
  dispatch({ type: LOGIN_SIGN_IN, isSignIn: true })
}

export const selectLoginOption = (option) => (dispatch) => {

}
