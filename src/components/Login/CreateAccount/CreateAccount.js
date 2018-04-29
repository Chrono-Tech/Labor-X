import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { Button, Input } from 'components/common'
import { FieldInputComponent } from 'components/Login'
import {LoginSteps} from 'store'
import validate from './validate'

import css from './CreateAccount.scss'

const FORM_LOGIN = 'form/createAccount'

const onSubmit = ({ walletName, password }) => {

  return {
    walletName,
    password,
  }
}

class CreateAccount extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func,
  }

  static defaultProps = {
    onChangeStep: PropTypes.func,
  }

  navigateToSelectWallet(){
    const { onChangeStep } = this.props
    onChangeStep(LoginSteps.SelectWallet)
  }

  render () {
    const { handleSubmit, error, pristine, invalid, name, address, avatar } = this.props

    return (
      <form className={css.root} name={FORM_LOGIN} onSubmit={handleSubmit}>
        <div className={css.header}>Create account</div>
        <Field
          className={css.row}
          component={Input}
          name='walletName'
          placeholder='Wallet name'
          autoComplete={false}
          lineEnabled={false}
          mods={css.passwordField}
        />
        <Field
          className={css.row}
          component={Input}
          name='password'
          type='password'
          placeholder='Password'
          autoComplete={false}
          lineEnabled={false}
          mods={css.passwordField}
        />
        <Field
          className={css.row}
          component={Input}
          name='passwordConfirm'
          type='password'
          placeholder='Password confirmation'
          autoComplete={false}
          lineEnabled={false}
          mods={css.passwordField}
        />
        <Button
          className={css.row}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Create a wallet'
          primary
          disabled={pristine || invalid}
          error={error}
        />
        <div className={css.otherActions}>
          or
          <button onClick={this.navigateToSelectWallet.bind(this)} className={css.loginButton}>Use an existing wallet</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_LOGIN, validate, onSubmit })(CreateAccount)
