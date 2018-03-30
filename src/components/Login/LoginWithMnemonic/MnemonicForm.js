import PropTypes from 'prop-types'
import React from 'react'

export default class MnemonicForm extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
  }

  static STEP = 'step/LoginWithMnemonic'

  render () {
    return (
      <div>
        TODO: LoginWithMnemonic
      </div>
    )
  }
}
