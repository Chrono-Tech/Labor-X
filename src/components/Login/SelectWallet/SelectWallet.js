import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'
import { Button, UserRow } from 'components/common'
// import { LoginSteps } from 'src/store'
import WalletEntryModel from 'src/models/wallets/WalletEntryModel'

import css from './SelectWallet.scss'

const DEFAULT_AVATAR = "/static/images/profile-photo-1.jpg"

export default class SelectWallet extends React.Component {
  static propTypes = {
    walletsList: PropTypes.arrayOf(PropTypes.instanceOf(WalletEntryModel)),
    onSelectWallet: PropTypes.func,
    profilesByAddressKey: PropTypes.shape({}),
    onChangeStep: PropTypes.func,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    error: PropTypes.instanceOf(Error),
  }

  static defaultProps = {
    walletsList: [],
    onSelectWallet: () => {},
  }

  constructor (props){
    super(props)

    this.state = {}
  }

  getWalletAddress (wallet) {
    return wallet.encrypted && wallet.encrypted[0] && wallet.encrypted[0].address || ''
  }

  getAvatar (profilesByAddressKey, wallet) {
    const address = this.getWalletAddress(wallet)
    if (_.get(profilesByAddressKey, `0x${address}`)) {
      const approvedAvatar = _.get(profilesByAddressKey, `0x${address}.level1`).getApprovedAvatar()
      if (approvedAvatar) {
        return approvedAvatar.url
      } else {
        return DEFAULT_AVATAR
      }
    } else {
      return DEFAULT_AVATAR
    }
  }

  getWalletsList () {
    const { walletsList, onSelectWallet, profilesByAddressKey } = this.props

    return (
      <div className={css.walletsWrapper}>
        {
          walletsList.map((wallet) => {
            const avatarUrl = this.getAvatar(profilesByAddressKey, wallet)
            return (<UserRow
              key={wallet.name}
              title={wallet.name}
              subtitle={this.getWalletAddress(wallet)}
              onClick={() => onSelectWallet(wallet)}
              avatar={avatarUrl}
              actionIconClass={css.actionIconClass}
              actionIcon='/static/images/svg/prev-white.svg'
            />)
          })
        }
      </div>
    )
  }

  getEmptyListMessage (){
    return <div className={css.emptyListMessage}>Sorry, there are no accounts to display</div>
  }

  navigateToLoginMethods (){
    // const { onChangeStep } = this.props
    // onChangeStep(LoginSteps.SelectLoginMethod)
  }

  navigateToCreateWallet () {
    // const { onChangeStep } = this.props
    // onChangeStep(LoginSteps.CreateWallet)
  }

  render () {
    const { error, pristine, invalid, walletsList } = this.props

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
