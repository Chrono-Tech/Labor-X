import { Button, Translate } from 'components/common'
import { LoginWithMnemonic, LoginWithPrivateKey, LoginWithWallet } from 'components/Login'
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
    const prefix = this.constructor.name

    return (
      <div>
        <h3 className={css.title}>Select Log In Method</h3>
        <div className={css.buttons}>
          <Button
            className={css.button}
            label={<Translate value={`${prefix}.mnemonic`} />}
            onClick={this.handleMnemonicClick}
          />
          <Button
            className={css.button}
            label={<Translate value={`${prefix}.wallet`} />}
            onClick={this.handleWalletClick}
          />
          <Button
            className={css.button}
            label={<Translate value={`${prefix}.privateKey`} />}
            onClick={this.handlePrivateKeyClick}
          />
        </div>
      </div>
    )
  }
}
