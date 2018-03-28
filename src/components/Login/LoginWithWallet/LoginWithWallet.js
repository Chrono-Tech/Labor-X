import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'components/common'
import css from './LoginWithWallet.scss'

export default class LoginWithWallet extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
  }

  static STEP = 'step/LoginWithWallet'

  handleBackClick = () => this.props.onChangeStep(null)

  render () {
    return (
      <div>
        LoginWithMnemonic
        <Button
          label='Back'
          onClick={this.handleBackClick}
        />
      </div>
    )
  }
}
