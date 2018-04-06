import ModelBase from './ModelBase'

export default class SignInModel extends ModelBase {
  static DEFAULTS = {
    method: null,
    address: null,
    isHD: false,
    isHardware: false,
  }

  static METHODS = {
    PRIVATE_KEY: 'privateKey',
    MNEMONIC: 'mnemonic',
    WALLET: 'wallet',
    LEDGER: 'leger',
    TREZOR: 'trezor',
  }
}
