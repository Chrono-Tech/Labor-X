import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { LoginActions } from 'src/components/layouts'
import { RecoveryAccountForm } from 'src/components/Login'
import { WalletEntryModel } from 'src/models'

import css from './index.scss'

class ForgotPassword extends React.Component {
  static propTypes = {
    walletsList: PropTypes.arrayOf(PropTypes.instanceOf(WalletEntryModel)),
    selectedWallet: PropTypes.instanceOf(WalletEntryModel),
  }

  render () {
    return (
      <div className={css.root}>
        <LoginActions>
          <RecoveryAccountForm />
        </LoginActions>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedWallet: state.wallet.selectedWallet,
    walletsList: state.wallet.walletsList,
  }
}

export default connect(mapStateToProps)(ForgotPassword)
