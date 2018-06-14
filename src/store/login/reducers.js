import * as a from './actions'

const initialState = {
  isSignIn: false,
  signIn: null,
  step: null,
  logoutStarted: false,
  selectedWalletRecoveryForm: null,
  isRecoveryPasswordMode: false,
  recoveryFormMnemonic: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.LOGIN_SIGN_IN:
      return {
        ...state,
        isSignIn: true,
      }
    case a.LOGIN_SIGN_OUT:
      return {
        ...state,
        isSignIn: false,
        signIn: null,
      }
    case a.LOGOUT_STARTED:
      return {
        ...state,
        logoutStarted: true,
      }
    case a.LOGOUT_FINISHED:
      return {
        ...state,
        logoutStarted: false,
      }
    case a.LOGIN_SET_SIGN_IN_MODEL:
      return {
        ...state,
        isSignIn: false,
        signIn: action.signInModel,
      }
    case a.LOGIN_CHANGE_STEP:
      return {
        ...state,
        step: action.step,
      }
    case a.LOGIN_SELECT_WALLET_RECOVERY_FORM:
      return {
        ...state,
        selectedWalletRecoveryForm: action.wallet,
      }
    case a.LOGIN_RESET_WALLET_RECOVERY_FORM:
      return {
        ...state,
        selectedWalletRecoveryForm: null,
      }
    case a.LOGIN_SET_RECOVERY_PASSWORD_MODE:
      return {
        ...state,
        isRecoveryPasswordMode: true,
      }
    case a.LOGIN_SET_RECOVERY_FORM_MNEMONIC:
      return {
        ...state,
        recoveryFormMnemonic: action.mnemonic,
      }
    case a.LOGIN_RESET_RECOVERY_FORM_MNEMONIC:
      return {
        ...state,
        recoveryFormMnemonic: '',
      }
    case a.LOGIN_RESET_RECOVERY_PASSWORD_MODE:
      return {
        ...state,
        isRecoveryPasswordMode: false,
      }
    default:
      return state
  }
}
