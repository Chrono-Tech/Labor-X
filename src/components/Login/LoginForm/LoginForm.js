import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import { Button, Input, Link, UserRow } from 'components/common'
import LogInModel from 'models/SignInModel'
import css from './LoginForm.scss'
import validate from './validate'

const FORM_LOGIN = 'form/login'

const onSubmit = ({ password }) => {

  return new LogInModel({
    address: '',
    password: password,
  })
}

class LoginForm extends React.Component {
  static propTypes = {
    selectedWallet: PropTypes.any,
  }

  static defaultProps = {
    selectedWallet: {},
  }

  getFirstAddress (wallet) {
    return wallet.encrypted && wallet.encrypted[0] && wallet.encrypted[0].address
  }

  render () {
    const { handleSubmit, error, pristine, invalid, selectedWallet } = this.props

    return (
      <form className={css.root} name={FORM_LOGIN} onSubmit={handleSubmit}>
        <div className={css.formHeader}>Log In</div>
        <UserRow title={selectedWallet.name} subtitle={this.getFirstAddress(selectedWallet)} />
        <Field
          className={css.row}
          component={Input}
          name='password'
          placeholder='Enter Password'
          autoComplete={false}
          mods={[Input.MODS.INVERT, css.passwordField]}
        />
        <Button
          className={css.row}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Login'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
        />
        <div>
          <Link href='/forgot-password' className={css.forgotPasswordLink}>Forgot your password?</Link>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_LOGIN, validate, onSubmit })(LoginForm)
