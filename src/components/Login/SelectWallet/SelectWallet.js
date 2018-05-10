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
  
  getWalletAddress(wallet) {
    return wallet.encrypted && wallet.encrypted[0] && wallet.encrypted[0].address || ''
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
              subtitle={this.getWalletAddress(wallet)}
              onClick={() => onSelectWallet(wallet)}
              actionIconClass={css.actionIconClass}
              actionIcon='/static/images/svg/prev-white.svg'
            />
          ))
        }
      </div>
    )
  }

  getEmptyListMessage(){
    return <div className={css.emptyListMessage}>Sorry, there are no accounts to display</div>
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
    const { handleSubmit, error, pristine, invalid, walletsList } = this.props

    return (
      <div className={css.root}>
        <div className={css.formHeader}>My Accounts</div>
        { walletsList.length ? this.getWalletsList() : this.getEmptyListMessage() }
        <Button
          onClick={this.navigateToLoginMethods.bind(this)}
          className={css.row}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Add an existing LaborX account'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
        />
      </div>
    )
  }
}
