import { Button } from 'components/common'
import { LoginWithPrivateKey, LoginWithWallet, LoginWithMnemonic } from 'components/Login'
import PropTypes from 'prop-types'
import React from 'react'
import css from './SelectOption.scss'

export default class SelectOption extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func,
  }

  static STEP = 'step/selectOption'

  handleMnemonicClick = () => this.props.onChangeStep(LoginWithMnemonic.STEP)

  handleWalletClick = () => this.props.onChangeStep(LoginWithWallet.STEP)

  handlePrivateKeyClick = () => this.props.onChangeStep(LoginWithPrivateKey.STEP)

  render () {
    return (
      <div>
        <h3 className={css.title}>Select Log In Method</h3>
        <div className={css.buttons}>
          <Button
            className={css.button}
            label='Mnemonic'
            onClick={this.handleMnemonicClick}
          />
          <Button
            className={css.button}
            label='Wallet'
            onClick={this.handleWalletClick}
          />
          <Button
            className={css.button}
            label='Private key'
            onClick={this.handlePrivateKeyClick}
          />
        </div>
      </div>
    )
  }
}
