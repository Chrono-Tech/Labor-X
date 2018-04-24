import React from 'react'
import PropTypes from 'prop-types'
import WalletEntryModel from './WalletEntryModel'

export default class WalletModel extends React.Component {
  static propTypes = {
    wallet: PropTypes.object,
    entry: PropTypes.instanceOf(WalletEntryModel),
  }
  
  constructor({wallet, entry}){
    super({wallet, entry})
    
    this.wallet = wallet
    this.entry = entry
  }
}
