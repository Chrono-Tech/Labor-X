import React, { PropTypes } from 'react'
import { SelectField, MenuItem, RaisedButton, Paper } from 'material-ui'

import styles from './styles'

export class AddressSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {selectedAccount: null}
  }

  handleChange = (event, index, value) => this.setState({selectedAccount: value})

  handleClick = () => {
    this.props.onAddressSelected(this.state.selectedAccount)
  }

  render () {
    const accounts = this.props.accounts || []
    const {selectedAccount} = this.state

    return (
      <Paper style={ styles.paper }>
        <SelectField
          floatingLabelText='Ethereum account'
          value={ selectedAccount }
          onChange={ this.handleChange }
          fullWidth={ true }>
          { accounts.map(a => <MenuItem key={a} value={a} primaryText={a}/>) }
        </SelectField>

        <RaisedButton
          label='Login'
          primary={ true }
          fullWidth={ true }
          onTouchTap={ this.handleClick }
          disabled={ this.state.selectedAccount === null }
          style={ styles.loginBtn }/>
      </Paper>
    )
  }
}

AddressSelect.propTypes = {
  onAddressSelected: PropTypes.func
}

export default AddressSelect
