import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Field, reduxForm } from 'redux-form'
import { Button, Input, UserRow } from 'components/common'
import { WalletEntryModel } from 'src/models'
import { LoginSteps } from 'src/store'

import css from './LoginForm.scss'

const DEFAULT_AVATAR = "/static/images/profile-photo-1.jpg"
export const FORM_LOGIN = 'form/login'

class LoginForm extends React.Component {
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
    const { handleSubmit, error, pristine, invalid, selectedWallet, onClickForgotPassword, fetchSignIn, profilesByAddressKey } = this.props
    const avatarUrl = this.getAvatar(profilesByAddressKey, selectedWallet)
    return (
      <form className={css.root} name={FORM_LOGIN} onSubmit={handleSubmit}>
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
        {
          !fetchSignIn ? (
            <Button
              className={css.loginButton}
              buttonClassName={css.submitButton}
              type={Button.TYPES.SUBMIT}
              label='LOGIN'
              primary
              disabled={pristine || invalid}
              error={error}
              errorMods={css.errorForm}
              mods={Button.MODS.INVERT}
            />
          )
            :
            <CircularProgress size={40} thickness={7} />
        }
        <div>
          <button onClick={onClickForgotPassword} className={css.forgotPasswordLink}>
            Forgot your password?
          </button>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_LOGIN })(LoginForm)
