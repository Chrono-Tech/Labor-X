import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import WalletEntryModel from './WalletEntryModel'
import SignerModel from './SignerModel'

const schema = {
  wallet: PropTypes.object,
  entry: PropTypes.instanceOf(WalletEntryModel),
}

export default class WalletModel extends AbstractModel {
  constructor (props) {
    super(props, schema)
    Object.assign(this, props)
    Object.freeze(this)
  }

  get signer () {
    // TODO @ipavlenko: Implement custom signers for hardware tokens
    if (!this.wallet[0]) {
      return null
    }
    return new SignerModel({
      address: this.wallet[0].address.toLowerCase(),
      sign: this.wallet[0].sign,
      signTransaction: this.wallet[0].signTransaction,
    })
  }
}
