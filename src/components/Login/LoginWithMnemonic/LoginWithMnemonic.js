import React from 'react'
import { Button } from 'components/common'
import css from './LoginWithMnemonic.scss'
import PropTypes from 'prop-types'

export default class LoginWithMnemonic extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
  }

  static STEP = 'step/LoginWithMnemonic'

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
