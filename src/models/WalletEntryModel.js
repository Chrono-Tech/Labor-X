import React from 'react'
import PropTypes from 'prop-types'

export default class WalletEntryModel extends React.Component {
  static propTypes = {
    key: PropTypes.string,
    name: PropTypes.string,
    encrypted: PropTypes.array,
  }
  
  constructor({key, name, encrypted}){
    super({key, name, encrypted})
    
    this.key = key
    this.name = name
    this.encrypted = encrypted
  }
}
