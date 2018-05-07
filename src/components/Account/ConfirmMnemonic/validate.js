export default (values, state) => {
  const mnemonic = values.mnemonic === state.mnemonic
  console.log('mnem', values.mnemonic, state.mnemonic, mnemonic ? 'ok' : 'Wrong field')
  
  return {
    mnemonic: mnemonic ? null : 'Wrong field',
  }
}
