import Router from 'next/router'

export const LOGIN_SIGN_IN = 'login/signIn'
export const LOGIN_SIGN_OUT = 'login/signOut'

// TODO @dkchv: !!! for tests, remove
export const signIn = (signInModel) => (dispatch) => {
  dispatch({ type: LOGIN_SIGN_IN, signInModel })
  Router.push('/test-sign-in')
}

export const signOut = () => (dispatch) => {
  dispatch({ type: LOGIN_SIGN_OUT })
}
