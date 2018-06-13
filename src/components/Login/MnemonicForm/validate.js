import bip39 from 'bip39'

export default (values) => {
  const mnemonic = (values.mnemonic || '').trim()

  return {
    mnemonic: bip39.validateMnemonic(mnemonic)
      ? null
      : 'Invalid mnemonic',
  }
}
