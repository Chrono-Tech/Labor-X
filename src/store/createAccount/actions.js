export const CREATE_ACCOUNT_SET_MNEMONIC = 'createAccount/setMnemonic'

export const setMnemonic = (mnemonic) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT_SET_MNEMONIC, mnemonic })
}
