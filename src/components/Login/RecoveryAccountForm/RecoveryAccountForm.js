import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import TextField from '@material-ui/core/TextField'

import { UserRow } from 'src/components/common'
import WhiteRoundedButton from 'src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton'
import { LoginSteps, validateRecoveryForm } from 'src/store'
import { WalletEntryModel } from 'src/models'

import css from './RecoveryAccountForm.scss'

const FORM_RECOVERY_PASSWORD = 'form/formRecoveryPassword'

const onSubmit = (values, dispatch) => {
  let words = [], mnemonic = ''

  for (let i = 0; i < 12; i++) {
    values[`word-${i}`] && words.push(values[`word-${i}`])
  }

  mnemonic = words.join(' ')

  const validForm = dispatch(validateRecoveryForm(mnemonic))

  if (!validForm) {
    throw new SubmissionError({ _error: 'Mnemonic incorrect for this wallet' })
  }

  return {
    mnemonic: mnemonic,
  }
}

class RecoveryAccountForm extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    selectedWallet: PropTypes.instanceOf(WalletEntryModel),
    onChangeStep: PropTypes.func,
    navigateToLoginForm: PropTypes.func,
    handleSubmit: PropTypes.func,
    walletsList: PropTypes.arrayOf(PropTypes.instanceOf(WalletEntryModel)),
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
    const { handleSubmit, error, selectedWallet, walletsList, navigateToLoginForm } = this.props
    const wordsArray = new Array(12).fill()

    return (
      <form className={css.root} name={FORM_RECOVERY_PASSWORD} onSubmit={handleSubmit}>
        <div className={css.formHeader}>Recover Account</div>
        <div className={css.userRowWrapper}>
          <UserRow
            title={this.getWalletAddress(selectedWallet)}
            onClick={walletsList.length === 1 ? null : this.navigateToSelectWallet.bind(this)}
            hideActionIcon={walletsList.length === 1}
          />
        </div>

        <div className={css.fieldWrapper}>
          {
            wordsArray.map((item, index) =>
              (<Field
                key={uniqid()}
                className={css.word}
                component={TextField}
                name={`word-${index}`}
                placeholder={`word ${index + 1}`}
              />)
            )
          }

        </div>

        <Field
          type='hidden'
          component='input'
          name='mnemonic'
        />
        <WhiteRoundedButton
          className={css.submitButtonWrapper}
          type='submit'
        >Proceed
        </WhiteRoundedButton>
        { !error ? null : <div className={css.formError}>{error}</div> }
        <p className={css.descriptionBlock}>
          or <button onClick={navigateToLoginForm} className={css.loginLink}>Login</button>
        </p>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_RECOVERY_PASSWORD, onSubmit })(RecoveryAccountForm)
