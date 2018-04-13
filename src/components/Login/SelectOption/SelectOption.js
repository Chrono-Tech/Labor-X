import { Button } from 'components/common'
import { MnemonicForm, PrivateKeyForm, WalletFileForm } from 'components/Login'
import PropTypes from 'prop-types'
import React from 'react'
import css from './SelectOption.scss'

export default class SelectOption extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func,
  }

  static STEP = 'step/selectOption'

  handleMnemonicClick = () => this.props.onChangeStep(MnemonicForm.STEP)

  handleWalletClick = () => this.props.onChangeStep(WalletFileForm.STEP)

  handlePrivateKeyClick = () => this.props.onChangeStep(PrivateKeyForm.STEP)

  render () {
    const prefix = this.constructor.name

    return (
      <div>
        <h3 className={css.title}>Select Log In Method</h3>
        <div className={css.buttons}>
          <Button
            className={css.button}
            label={`${prefix}.mnemonic`}
            onClick={this.handleMnemonicClick}
          />
          <Button
            className={css.button}
            label={`${prefix}.wallet`}
            onClick={this.handleWalletClick}
          />
          <Button
            className={css.button}
            label={`${prefix}.privateKey`}
            onClick={this.handlePrivateKeyClick}
          />
        </div>
      </div>
    )
  }
}
