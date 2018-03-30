export default class SignInModel {
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

  constructor (data = {}) {
    this.parse(data)
    Object.freeze(this)
  }

  parse (origData) {
    const data = Object.assign({}, SignInModel.DEFAULTS, origData)
    for (let k in data) {
      if (data.hasOwnProperty(k) && SignInModel.DEFAULTS[k] !== undefined) {
        this[ k ] = data[ k ]
      }
    }
  }
}
