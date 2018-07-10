import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { Button, Input, UserRow } from 'src/components/common'
import { WalletEntryModel } from 'src/models'
import { LoginSteps } from 'src/store'

import css from './RecoveryPasswordResetForm.scss'

const FORM_PASSWORD_RESET = 'form/formPasswordReset'

const onSubmit = ({ password }) => {
  if (!password) {
    throw new SubmissionError({ _error: 'Wrong password' })
  }

  return {
    password,
  }
}

class RecoveryPasswordResetForm extends React.Component {
  static propTypes = {
    selectedWallet: PropTypes.instanceOf(WalletEntryModel),
    onChangeStep: PropTypes.func,
    walletsList: PropTypes.arrayOf(PropTypes.instanceOf(WalletEntryModel)),
  }

  constructor (props){
    super(props)

    this.state = {
      previousSelectedWallet: props.selectedWallet,
    }
  }

  getWalletAddress (wallet) {
    return wallet && wallet.encrypted && wallet.encrypted[0] && wallet.encrypted[0].address || ''
  }

  navigateToSelectWallet (){
    const { onChangeStep } = this.props
    onChangeStep(LoginSteps.SelectWallet)
  }

  navigateToLogin (){
    const { onChangeStep } = this.props
    onChangeStep(LoginSteps.Login)
  }

  render () {
    const { handleSubmit, error, pristine, invalid, selectedWallet, walletsList } = this.props
    const wordsArray = new Array(12).fill()

    return (
      <form className={css.root} name={FORM_PASSWORD_RESET} onSubmit={handleSubmit}>
        <div className={css.formHeader}>Recover Account</div>

        <div className={css.userRowWrapper}>
          <UserRow
            title={this.getWalletAddress(selectedWallet)}
            onClick={null}
          />
        </div>

        <Field
          className={css.row}
          component={Input}
          name='password'
          type='password'
          autoComplete={false}
          placeholder='New Account Password'
          mods={css.passwordField}
          errorMods={css.fieldError}
          lineEnabled={false}
        />
        <Field
          className={css.row}
          component={Input}
          name='password-confirm'
          type='password'
          autoComplete={false}
          placeholder='Confirm New Account Password'
          mods={[css.passwordField, css.passwordConfirmField].join(' ')}
          errorMods={css.fieldError}
          lineEnabled={false}
        />
        <Button
          className={css.row}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Proceed to Login'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
        />
      </form>
    )
  }
}

export default reduxForm({ form: FORM_PASSWORD_RESET, onSubmit })(RecoveryPasswordResetForm)
