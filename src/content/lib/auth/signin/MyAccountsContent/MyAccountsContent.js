// @flow

import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import Link from 'react-router-dom/Link'
import PropTypes from "prop-types"

import SigninLayout from "src/components/layouts/SigninLayout/SigninLayout"
import WalletEntryModel from "src/models/wallets/WalletEntryModel"
import { UserRow } from 'src/components/common'
import WhiteRoundedButton from "src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton"
import { walletEntriesSelector } from "src/store/wallet/selectors"
import { selectWallet } from "src/store/auth/signin/actions"

import css from './MyAccountsContent.scss'

// const DEFAULT_AVATAR = "/static/images/profile-photo-1.jpg"

export class MyAccountsContent extends React.Component {

  static propTypes = {
    walletEntries: PropTypes.arrayOf(PropTypes.instanceOf(WalletEntryModel)),
    onSelectWallet: PropTypes.func,
    profilesByAddressKey: PropTypes.shape({}),
    selectWallet: PropTypes.func,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    error: PropTypes.instanceOf(Error),
  }

  renderWalletEntries () {
    return (
      <div className={css.walletsWrapper}>
        {
          this.props.walletEntries.map((walletEntry: WalletEntryModel, i) => {
            // const avatarUrl = this.getAvatar(profilesByAddressKey, wallet)
            return (
              <UserRow
                key={walletEntry.name}
                title={walletEntry.name}
                subtitle={walletEntry.encrypted[0].address}
                onClick={() => this.props.selectWallet(i)}
                // avatar={avatarUrl}
                actionIconClass={css.actionIconClass}
                actionIcon='/static/images/svg/prev-white.svg'
              />
            )
          })
        }
      </div>
    )
  }

  renderNoWalletEntries (){
    return <div className={css.emptyListMessage}>Sorry, there are no accounts to display</div>
  }

  render () {
    return (
      <SigninLayout>
        <div className={css.root}>
          <div className={css.formHeader}>My Accounts</div>
          { this.props.walletEntries.length ? this.renderWalletEntries() : this.renderNoWalletEntries() }
          <WhiteRoundedButton component={Link} to='/auth/import/select-method'>Add an existing LaborX account</WhiteRoundedButton>
        </div>
      </SigninLayout>
    )
  }

}

const mapStateToProps = (state) => ({
  walletEntries: walletEntriesSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  selectWallet: (index) => dispatch(selectWallet(index)),
})

MyAccountsContent = connect(mapStateToProps, mapDispatchToProps)(MyAccountsContent)

export default MyAccountsContent
