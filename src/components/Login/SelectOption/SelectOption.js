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
          <button className={css.button} onClick={this.handleMnemonicClick}>
            <img className={css.buttonImage} src='/static/images/svg/mnemonic.svg' alt='' />
            Use Mnemonic Key
          </button>
          <button className={css.button} onClick={this.handleWalletClick}>
            <img className={css.buttonImage} src='/static/images/svg/file.svg' alt='' />
            Select Wallet File
          </button>
          <button className={css.button} onClick={this.handlePrivateKeyClick}>
            <img className={css.buttonImage} src='/static/images/svg/key.svg' alt='' />
            Enter Private Key
          </button>
          <button className={css.button} onClick={this.handlePrivateKeyClick}>
            <img className={css.buttonImage} src='/static/images/svg/ledger-nano.svg' alt='' />
            Use Ledger Nano USB
          </button>
          <button className={css.button} onClick={this.handlePrivateKeyClick}>
            <img className={css.buttonImage} src='/static/images/svg/trezor.svg' alt='' />
            Use Trezor USB
          </button>
        </div>
      </div>
    )
  }
}
