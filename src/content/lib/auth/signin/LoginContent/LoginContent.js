import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import _ from 'lodash'
import { Field, reduxForm } from 'redux-form'
import PropTypes from "prop-types"

import { FORM } from 'src/store/auth/signin/constants'
import { submitLoadingSelector } from 'src/store/auth/signin/selectors'
import { submit } from 'src/store/auth/signin/actions'
import SigninLayout from "src/components/layouts/SigninLayout/SigninLayout"
import { Input, UserRow } from 'src/components/common'
import { WalletEntryModel } from 'src/models'
import { LoginSteps } from 'src/store'
import { selectedWalletSelector } from "src/store/wallet/selectors"
import WhiteRoundedButton from "src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton"

import css from './LoginContent.scss'

const DEFAULT_AVATAR = "/static/images/profile-photo-1.jpg"

export class LoginContent extends React.Component {

  static propTypes = {
    selectedWallet: PropTypes.instanceOf(WalletEntryModel),
    onChangeStep: PropTypes.func,
    walletsList: PropTypes.arrayOf(PropTypes.instanceOf(WalletEntryModel)),
    onClickForgotPassword: PropTypes.func,
    handleSubmit: PropTypes.func,
    error: PropTypes.string,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    fetchSignIn: PropTypes.bool,
    submitLoading: PropTypes.bool,
    profilesByAddressKey: PropTypes.shape({}),
  }

  handleNavigateToSelectWallet = () => {
    const { onChangeStep } = this.props
    onChangeStep(LoginSteps.SelectWallet)
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

  render () {
    const { selectedWallet, onClickForgotPassword, profilesByAddressKey } = this.props
    const avatarUrl = this.getAvatar(profilesByAddressKey, selectedWallet)
    return (
      <SigninLayout>
        <form className={css.root} name={FORM} onSubmit={this.props.handleSubmit}>
          <div className={css.formHeader}>Log In</div>
          <div className={css.accountWrapper}>
            <UserRow
              title={selectedWallet && selectedWallet.name}
              onClick={this.handleNavigateToSelectWallet}
              avatar={avatarUrl}
            />
          </div>
          <Field
            className={css.row}
            component={Input}
            name='password'
            type='password'
            placeholder='Enter Password'
            autoComplete={false}
            mods={css.passwordField}
            errorMods={css.fieldError}
            inputMods={css.passwordFieldInput}
            lineEnabled={false}
            materialInput={false}
          />
          <WhiteRoundedButton type='submit' loader={this.props.submitLoading}>LOGIN</WhiteRoundedButton>
          <br />
          <br />
          <br />
          <div>
            <button onClick={onClickForgotPassword} className={css.forgotPasswordLink}>
              Forgot your password?
            </button>
          </div>
        </form>
      </SigninLayout>
    )
  }

}

LoginContent = reduxForm({
  form: FORM,
})(LoginContent)

const mapStateToProps = (state) => ({
  selectedWallet: selectedWalletSelector(state),
  submitLoading: submitLoadingSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: () => dispatch(submit()),
})

LoginContent = connect(mapStateToProps, mapDispatchToProps)(LoginContent)

export default LoginContent
