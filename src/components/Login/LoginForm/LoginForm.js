import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Field, reduxForm } from 'redux-form'
import { Button, Input, UserRow } from 'components/common'
import { WalletEntryModel } from 'src/models'
import { LoginSteps } from 'src/store'

import css from './LoginForm.scss'

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
  }

  handleNavigateToSelectWallet = () => {
    const { onChangeStep } = this.props
    onChangeStep(LoginSteps.SelectWallet)
  }

  render () {
    const { handleSubmit, error, pristine, invalid, selectedWallet, onClickForgotPassword, fetchSignIn } = this.props

    return (
      <form className={css.root} name={FORM_LOGIN} onSubmit={handleSubmit}>
        <div className={css.formHeader}>Log In</div>
        <div className={css.accountWrapper}>
          <UserRow
            title={selectedWallet && selectedWallet.name}
            onClick={this.handleNavigateToSelectWallet}
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
