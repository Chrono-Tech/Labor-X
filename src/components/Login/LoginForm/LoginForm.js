import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm  } from 'redux-form'
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
  }

  navigateToSelectWallet () {
    const { onChangeStep } = this.props
    onChangeStep(LoginSteps.SelectWallet)
  }

  render () {
    const { handleSubmit, error, pristine, invalid, selectedWallet , walletsList, onClickForgotPassword } = this.props

    return (
      <form className={css.root} name={FORM_LOGIN} onSubmit={handleSubmit}>
        <div className={css.formHeader}>Log In</div>
        <div className={css.accountWrapper}>
          <UserRow
            title={selectedWallet && selectedWallet.name}
            onClick={this.navigateToSelectWallet.bind(this)}
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
        <Button
          className={css.row}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Login'
          primary
          disabled={pristine || invalid}
          error={error}
          errorMods={css.errorForm}
          mods={Button.MODS.INVERT}
        />
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
