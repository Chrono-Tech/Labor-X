import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { Button, Input } from 'components/common'
import { LoginSteps, validateWalletName } from 'store'
import validate from './validate'

import css from './CreateAccount.scss'

const FORM_LOGIN = 'form/createAccount'

const onSubmit = ({ walletName, password }, dispatch) => {
  const validateName = dispatch(validateWalletName(walletName))
  
  if (!validateName){
    throw new SubmissionError({
      walletName: 'Please enter other wallet name',
    })
  }

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

  navigateToSelectWallet (){
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
          label='Wallet name'
          autoComplete={false}
          lineEnabled={false}
          mods={css.passwordField}
          errorMods={css.fieldError}
          materialInput
        />
        <Field
          className={css.row}
          component={Input}
          name='password'
          type='password'
          placeholder='Password'
          label='Password'
          autoComplete={false}
          lineEnabled={false}
          mods={css.passwordField}
          materialInput
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
          materialInput
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
