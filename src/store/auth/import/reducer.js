// @flow

import {
  UPDATE_ENCRYPTED_WALLET_REQUEST,
  UPDATE_ENCRYPTED_WALLET_SUCCESS,
  UPDATE_ENCRYPTED_WALLET_FAILURE,
  DELETE_ENCRYPTED_WALLET,
  SUBMIT_FILE_REQUEST,
  SUBMIT_FILE_SUCCESS,
  SUBMIT_FILE_FAILURE,
  SUBMIT_PKEY_REQUEST,
  SUBMIT_PKEY_SUCCESS,
  SUBMIT_PKEY_FAILURE,
  SUBMIT_SEED_REQUEST,
  SUBMIT_SEED_SUCCESS,
  SUBMIT_SEED_FAILURE,
  UPDATE_WALLET,
  SHOW_PERSON_404_DIALOG,
  HIDE_PERSON_404_DIALOG,
} from './actions'

interface State {
  encryptedWallet: EncryptedWallet; // /import/file
  updateEncryptedWalletLoading: boolean;
  updateEncryptedWalletFailure: Error;
  wallet: Wallet; // import/seed & /import/pkey
  submitFileLoading: boolean;
  submitFileFailure: Error;
  submitPkeyLoading: boolean;
  submitPkeyFailure: Error;
  submitSeedLoading: boolean;
  submitSeedFailure: Error;
  openPerson404Dialog: boolean;
}

const STATE = {
  encryptedWallet: null,
  updateEncryptedWalletLoading: false,
  updateEncryptedWalletFailure: null,
  wallet: null,
  submitFileLoading: false,
  submitFileFailure: null,
  submitPkeyLoading: false,
  submitPkeyFailure: null,
  submitSeedLoading: false,
  submitSeedFailure: null,
  openPerson404Dialog: false,
}

export const reducer = (state: State = STATE, action) => {
  switch (action.type) {
    case UPDATE_ENCRYPTED_WALLET_REQUEST: return ({ ...state, updateEncryptedWalletLoading: true })
    case UPDATE_ENCRYPTED_WALLET_SUCCESS: return ({ ...state, updateEncryptedWalletLoading: false, encryptedWallet: action.payload.encryptedWallet })
    case UPDATE_ENCRYPTED_WALLET_FAILURE: return ({ ...state, updateEncryptedWalletLoading: false, updateEncryptedWalletFailure: action.payload })
    case DELETE_ENCRYPTED_WALLET: return ({ ...state, encryptedWallet: null })
    case SUBMIT_FILE_REQUEST: return ({ ...state, submitFileLoading: true })
    case SUBMIT_FILE_SUCCESS: return ({ ...state, submitFileLoading: false })
    case SUBMIT_FILE_FAILURE: return ({ ...state, submitFileLoading: false, submitFileFailure: action.payload })
    case SUBMIT_PKEY_REQUEST: return ({ ...state, submitPkeyLoading: true })
    case SUBMIT_PKEY_SUCCESS: return ({ ...state, submitPkeyLoading: false })
    case SUBMIT_PKEY_FAILURE: return ({ ...state, submitPkeyLoading: false, submitPkeyFailure: action.payload })
    case SUBMIT_SEED_REQUEST: return ({ ...state, submitSeedLoading: true })
    case SUBMIT_SEED_SUCCESS: return ({ ...state, submitSeedLoading: false })
    case SUBMIT_SEED_FAILURE: return ({ ...state, submitSeedLoading: false, submitSeedFailure: action.payload })
    case UPDATE_WALLET: return ({ ...state, wallet: action.wallet })
    case SHOW_PERSON_404_DIALOG: return ({ ...state, openPerson404Dialog: true })
    case HIDE_PERSON_404_DIALOG: return ({ ...state, openPerson404Dialog: false })
    default: return ({ ...state })
  }
}

export default reducer
