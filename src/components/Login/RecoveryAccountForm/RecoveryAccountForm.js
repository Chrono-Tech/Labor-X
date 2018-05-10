import React from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm, change, SubmissionError, submit} from 'redux-form'

import { Button, Input, Link, UserRow } from 'components/common'
import { FieldInputComponent } from 'components/Login'
import WalletEntryModel from 'models/WalletEntryModel'
import {LoginSteps, validateRecoveryForm} from 'store'

import css from './RecoveryAccountForm.scss'

const FORM_RECOVERY_PASSWORD = 'form/formRecoveryPassword'

const onSubmit = (values, dispatch) => {
  let words = [], mnemonic = ''
  
  for (let i = 0; i < 12; i++) {
    values[`word-${i}`] && words.push(values[`word-${i}`])
  }
  
  mnemonic = words.join(' ')
  
  const validForm = dispatch(validateRecoveryForm(mnemonic))
  
  console.log('mnemonic', mnemonic, validForm)
  
  if (!validForm) {
    throw new SubmissionError({ _error: 'Mnemonic incorrect for this wallet' })
  }
  
  return {
    mnemonic: mnemonic
  }
}

class RecoveryAccountForm extends React.Component {
  static propTypes = {
    selectedWallet: PropTypes.instanceOf(WalletEntryModel),
    onChangeStep: PropTypes.func,
    walletsList: PropTypes.arrayOf(PropTypes.instanceOf(WalletEntryModel)),
  }
  
  componentDidMount(){
    
    const { dispatch } = this.props
    let wordsArray = 'club bullet chief lend subway small merit engine harbor post scale market'.split(' ')
    wordsArray.forEach((item, i) => {
      dispatch(change(FORM_RECOVERY_PASSWORD, `word-${i}`, item))
    })

  }
  
  getWalletAddress(wallet) {
    return wallet && wallet.encrypted && wallet.encrypted[0] && wallet.encrypted[0].address || ''
  }
  
  navigateToSelectWallet(){
    const {onChangeStep} = this.props
    onChangeStep(LoginSteps.SelectWallet)
  }
  
  navigateToLogin(){
    const {onChangeStep} = this.props
    onChangeStep(LoginSteps.Login)
  }
  
  render () {
    const { handleSubmit, error, pristine, invalid, selectedWallet, walletsList } = this.props
    const wordsArray = new Array(12).fill()
    console.log('recovery', pristine, invalid)

    return (
      <form className={css.root} name={FORM_RECOVERY_PASSWORD} onSubmit={handleSubmit}>
        <div className={css.formHeader}>Recover Account</div>
        <div className={css.userRowWrapper}>
          <UserRow
            title={this.getWalletAddress(selectedWallet)}
            onClick={this.navigateToSelectWallet.bind(this)}
            hideActionIcon={walletsList.length === 1}
          />
        </div>

        <div className={css.fieldWrapper}>
          {
            wordsArray.map((item, index) =>
              (<Field
                key={index}
                className={css.word}
                component={Input}
                name={`word-${index}`}
                placeholder={`word ${index + 1}`}
                autoComplete={false}
                mods={css.wordField}
                lineEnabled={false}
              />)
            )
          }

        </div>
  
        <Field
          type='hidden'
          component='input'
          name='mnemonic'
          autoComplete={false}
          lineEnabled={false}
        />
        <Button
          className={css.submitButtonWrapper}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Proceed'
          primary
          disabled={pristine}
          error={error}
          mods={Button.MODS.INVERT}
          errorClassName={css.formError}
        />
        <p className={css.descriptionBlock}>
          or <button onClick={this.navigateToLogin.bind(this)} className={css.loginLink}>Login</button>
        </p>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_RECOVERY_PASSWORD, onSubmit })(RecoveryAccountForm)
