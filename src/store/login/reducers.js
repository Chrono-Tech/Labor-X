import * as actions from './actions'

const initialState = {
  openAccount404Dialog: false,
  fetchSignIn: false,
  isSignIn: false,
  signIn: null,
  step: null,
  prevStep: null,
  selectedWalletRecoveryForm: null,
  isRecoveryPasswordMode: false,
  recoveryFormMnemonic: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_SIGN_IN:
      return {
        ...state,
        isSignIn: true,
      }
    case actions.START_FETCH_SIGN_IN:
      return {
        ...state,
        fetchSignIn: true,
      }
    case actions.END_FETCH_SIGN_IN:
      return {
        ...state,
        fetchSignIn: false,
      }
    case actions.LOGIN_SIGN_OUT:
      return {
        ...state,
        isSignIn: false,
        signIn: null,
      }
    case actions.LOGIN_SET_SIGN_IN_MODEL:
      return {
        ...state,
        isSignIn: false,
        signIn: action.signInModel,
      }
    case actions.LOGIN_CHANGE_STEP:
      return {
        ...state,
        prevStep: state.step,
        step: action.step,
      }
    case actions.LOGIN_SELECT_WALLET_RECOVERY_FORM:
      return {
        ...state,
        selectedWalletRecoveryForm: action.wallet,
      }
    case actions.LOGIN_RESET_WALLET_RECOVERY_FORM:
      return {
        ...state,
        selectedWalletRecoveryForm: null,
      }
    case actions.LOGIN_SET_RECOVERY_PASSWORD_MODE:
      return {
        ...state,
        isRecoveryPasswordMode: true,
      }
    case actions.LOGIN_SET_RECOVERY_FORM_MNEMONIC:
      return {
        ...state,
        recoveryFormMnemonic: action.mnemonic,
      }
    case actions.LOGIN_RESET_RECOVERY_FORM_MNEMONIC:
      return {
        ...state,
        recoveryFormMnemonic: '',
      }
    case actions.LOGIN_RESET_RECOVERY_PASSWORD_MODE:
      return {
        ...state,
        isRecoveryPasswordMode: false,
      }

    case actions.ACCOUNT_404_DIALOG_SHOW: return ({
      ...state,
      openAccount404Dialog: true,
    })
    case actions.ACCOUNT_404_DIALOG_HIDE: return ({
      ...state,
      openAccount404Dialog: false,
    })

    default:
      return state
  }
}
