import React from 'react';
import { TextField, RaisedButton, Paper } from 'material-ui'

import styles from './styles'

class PrivateKeyInput extends React.Component {

  constructor (props) {
    super(props)
    this.state = {privateKey: ''}
  }

  handleChange = (event, value) => this.setState({privateKey: value})

  handleClick = () => {
    this.props.onProceed(this.state.privateKey)
  }

  render () {
    return (
      <Paper style={ styles.paper }>
        <TextField
          floatingLabelText='Ethereum private key'
          onChange={ this.handleChange }
          fullWidth={ true }>
        </TextField>

        <RaisedButton
          label='Proceed'
          primary={ true }
          fullWidth={ true }
          onTouchTap={ this.handleClick }
          disabled={ this.state.privateKey === '' }
          style={ styles.loginBtn }/>
      </Paper>
    )
  }
}

export default PrivateKeyInput;