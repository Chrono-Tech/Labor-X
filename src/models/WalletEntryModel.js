import React from 'react'
import PropTypes from 'prop-types'
import AbstractModel from './AbstractModel'

const schema = {
  key: PropTypes.string,
  name: PropTypes.string,
  types: PropTypes.object,
  encrypted: PropTypes.array,
}

export default class WalletEntryModel extends AbstractModel {
  constructor(props) {
    super(props, schema)
    
    this.key = props.key || ''
    this.name = props.name || ''
    this.types = props.types || {}
    this.encrypted = props.encrypted
    
  }
}
