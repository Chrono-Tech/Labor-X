import PropTypes from 'prop-types'
import WalletEntryModel from './WalletEntryModel'
import AbstractModel from './AbstractModel'

const schema = {
  wallet: PropTypes.object,
  entry: PropTypes.instanceOf(WalletEntryModel),
}

export default class WalletModel extends AbstractModel {
  constructor(props) {
    super(props, schema)

    this.wallet = props.wallet
    this.entry = props.entry
  }
}
