import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import TextField from '@material-ui/core/TextField'

import WhiteRoundedButton from 'src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton'
import { UserRow } from 'src/components/common'
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
    handleSubmit: PropTypes.func,
    error: PropTypes.string,
    selectedWallet: PropTypes.instanceOf(WalletEntryModel),
    onChangeStep: PropTypes.func,
  }

  constructor (props){
    super(props)
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
    const { handleSubmit, error, selectedWallet } = this.props
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
          component={TextField}
          name='password'
          type='password'
          placeholder='New Account Password'
        />
        <Field
          className={css.row}
          component={TextField}
          name='password-confirm'
          type='password'
          placeholder='Confirm New Account Password'
        />
        <WhiteRoundedButton
          className={css.row}
          type='submit'
          label=''
        >
        Proceed to Login
        </WhiteRoundedButton>
        { !error ? null : <div className={css.formError}>{error}</div> }
      </form>
    )
  }
}

export default reduxForm({ form: FORM_PASSWORD_RESET, onSubmit })(RecoveryPasswordResetForm)
