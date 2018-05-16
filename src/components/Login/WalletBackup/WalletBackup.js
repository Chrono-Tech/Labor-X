import PropTypes from 'prop-types'
import React from 'react'
import Router from 'next/router'

import { Button, Input, Link, UserRow } from 'components/common'
import { LoginSteps } from 'src/store'

import css from './WalletBackup.scss'

export default class SelectWallet extends React.Component {
  static propTypes = {
    walletsList: PropTypes.array,
    onSelectWallet: PropTypes.func,
    downloadWallet: PropTypes.func,
  }
  
  static defaultProps = {
    walletsList: [],
    onSelectWallet: () => {},
    downloadWallet: () => {},
  }

  navigateToSelectWallet (){
    const { onChangeStep } = this.props
    onChangeStep(LoginSteps.SelectWallet)
  }
  
  render () {
    const { handleSubmit, error, pristine, invalid, walletsList, classes, downloadWallet } = this.props
    
    return (
      <div className={css.root}>
        <div className={css.formHeader}>Wallet Backup</div>
        <p className={css.description}>Download encrypted wallet file and store it on your device.</p>
        <Button
          onClick={downloadWallet}
          className={css.submitButtonWrapper}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Backup my Wallet'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
        />
        <p>
          or <br />
          <button onClick={this.navigateToSelectWallet.bind(this)} className={css.continueLink}>Continue</button>
        </p>
      
      </div>
    )
  }
}
