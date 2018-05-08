export default (values, state) => {
  const mnemonic = values.mnemonic === state.mnemonic
  
  return {
    mnemonic: mnemonic ? null : 'Wrong field',
  }
}
