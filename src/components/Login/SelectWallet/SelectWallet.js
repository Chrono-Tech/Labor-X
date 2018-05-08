import PropTypes from 'prop-types'
import React from 'react'
import { Button, Input, Link, UserRow } from 'components/common'
import {LoginSteps} from 'store'
import css from './SelectWallet.scss'

export default class SelectWallet extends React.Component {
  static propTypes = {
    walletsList: PropTypes.array,
    onSelectWallet: PropTypes.func,
  }

  static defaultProps = {
    walletsList: [],
    onSelectWallet: () => {},
  }

  getWalletsList() {
    const { walletsList, onSelectWallet } = this.props

    return (
      <div className={css.walletsWrapper}>
        {
          walletsList.map((wallet, index) => (
            <UserRow
              key={index}
              title={wallet.name}
              onClick={() => onSelectWallet(wallet)}
            />
          ))
        }
      </div>
    )
  }

  getEmptyListMessage(){
    return <div className={css.emptyListMessage}>You have no wallets</div>
  }
  
  navigateToLoginMethods(){
    const { onChangeStep } = this.props
    onChangeStep(LoginSteps.SelectLoginMethod)
  }
  
  navigateToCreateWallet(){
    const { onChangeStep } = this.props
    onChangeStep(LoginSteps.CreateWallet)
  }

  render () {
    const { handleSubmit, error, pristine, invalid, walletsList, onSelectWallet } = this.props

    return (
      <div className={css.root}>
        <div className={css.formHeader}>Select wallet</div>
        { walletsList.length ? this.getWalletsList() : this.getEmptyListMessage() }
        <Button
          onClick={this.navigateToLoginMethods.bind(this)}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Import wallet'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
        />
        <p className={css.otherActions}>
          or
          <Link className={css.loginLink} href='/create-account'>Create a new wallet</Link>
        </p>
      </div>
    )
  }
}
