import React  from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import bip39 from 'bip39'

import { AccountLayout } from 'src/components/layouts'
import { AccountPasswordForm, ShowMnemonic, ConfirmMnemonic, BackupWallet } from 'src/components/Account'
import {
  setMnemonic,
  setPassword,
  setAccountTypes,
  createUserAccount,
  downloadWallet,
  onFinishCreateAccount,
  navigateToSelectMethod,
  handleAccountPasswordFormSubmitSuccess,
} from 'src/store/createAccount/actions'
import { getExistingAccount } from 'src/store/createAccount/selectors'

import css from './index.scss'

class AccountPasswordPage extends React.Component {

  constructor (){
    super()

    this.state = {
      activePage: null,
    }
  }

  componentDidMount () {
    this.props.setMnemonic(bip39.generateMnemonic())
  }

  handleAccountPasswordFormSubmitSuccess = (values) => {
    this.props.handleAccountPasswordFormSubmitSuccess(values)
    // const { setPassword, setAccountTypes } = this.props
    // setPassword(password)
    // setAccountTypes(types)
  }

  render () {
    const { onFinishCreateAccount, downloadWallet, createUserAccount, navigateToSelectMethod } = this.props

    return (
      <div className={css.root}>
        <AccountLayout title='Create New Account'>
          <AccountPasswordForm
            navigateToSelectMethod={navigateToSelectMethod}
            onSubmitSuccess={this.handleAccountPasswordFormSubmitSuccess}
            existingAccount={this.props.existingAccount}
          />
          {/*<ShowMnemonic />*/}
          {/*<ConfirmMnemonic onSubmitSuccess={createUserAccount} />*/}
          {/*<BackupWallet onClickDownload={downloadWallet} onClickFinish={onFinishCreateAccount} />*/}
        </AccountLayout>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  existingAccount: getExistingAccount(state),
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setMnemonic,
    setPassword,
    setAccountTypes,
    createUserAccount,
    downloadWallet,
    onFinishCreateAccount,
    navigateToSelectMethod,
    handleAccountPasswordFormSubmitSuccess,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPasswordPage)
