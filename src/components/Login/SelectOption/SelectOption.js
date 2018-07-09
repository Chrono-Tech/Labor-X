import PropTypes from 'prop-types'
import React from 'react'
import { Button, Link } from 'components/common'
import { MnemonicForm, PrivateKeyForm, WalletFileForm } from 'components/Login'
import { LoginSteps } from 'store'

import css from './SelectOption.scss'

export default class SelectOption extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func,
    step: PropTypes.string,
  }

  static STEP = 'step/selectOption'

  handleMnemonicClick = () => this.props.onChangeStep(MnemonicForm.STEP)

  handleWalletClick = () => this.props.onChangeStep(WalletFileForm.STEP)

  handlePrivateKeyClick = () => this.props.onChangeStep(PrivateKeyForm.STEP)

  render () {
    const { onChangeStep } = this.props
    const prefix = this.constructor.name

    return (
      <div>
        <Link className={css.helpLink} href='/'>
          <img src='/static/images/svg/help-white.svg' width='48' height='48' alt='' />
        </Link>
        <div className={css.pageHeader}>Add an existing account</div>
        <div className={css.buttonsWrapper}>
          <button
            className={css.methodButton}
            onClick={() => onChangeStep(LoginSteps.Ledger)}
          >
            <img src='/static/images/svg/ledger-nano.svg' width='48' height='48' alt='' />
            LedgerNano
          </button>
          <button
            className={css.methodButton}
            onClick={() => onChangeStep(LoginSteps.Trezor)}
          >
            <img src='/static/images/svg/trezor.svg' width='48' height='48' alt='' />
            Trezor
          </button>
          <button
            className={[css.methodButton, css.pluginButton].join(' ')}
            onClick={() => onChangeStep(LoginSteps.BrowserPlugIn)}
          >
            <img src='/static/images/svg/plugin.svg' width='48' height='48' alt='' />
            Browser Plug-in
          </button>
          <button
            className={css.methodButton}
            onClick={() => onChangeStep(LoginSteps.Mnemonic)}
          >
            <img src='/static/images/svg/mnemonic.svg' width='48' height='48' alt='' />
            Mnemonic
          </button>
          <button
            className={css.methodButton}
            onClick={() => onChangeStep(LoginSteps.PrivateKey)}
          >
            <img src='/static/images/svg/key.svg' width='48' height='48' alt='' />
            Private key
          </button>
          <button
            className={[css.methodButton, css.walletButton].join(' ')}
            onClick={() => onChangeStep(LoginSteps.WalletFile)}
          >
            <img src='/static/images/svg/wallet.svg' width='48' height='48' alt='' />
            Wallet file
          </button>
          <button
            className={[css.methodButton, css.uportButton].join(' ')}
            onClick={() => onChangeStep(LoginSteps.Uport)}
          >
            <img src='/static/images/svg/wallet.svg' width='48' height='48' alt='' />
              Uport
          </button>
        </div>
        <div className={css.otherActions}>
        or
        <button className={css.backButton} onClick={() => onChangeStep(LoginSteps.SelectWallet)}>back</button>
        </div>
      </div>
    )
  }
}
