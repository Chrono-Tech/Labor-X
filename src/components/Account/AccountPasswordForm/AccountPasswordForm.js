import React  from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field, SubmissionError } from 'redux-form'

import { Link, Button, Input } from 'components/common'
import 'styles/globals/globals.scss'
import validate from './validate'

import css from './AccountPasswordForm.scss'

const FORM_ACCOUNT_PASSWORD = 'form/accountPassword'

const onSubmit = ({ password, recruiter, worker, client }) => {
  if (!(recruiter || worker || client)) {
    throw new SubmissionError({
      _error: 'Please select at least one of account type',
    })
  }

  return {
    password,
    types: {
      recruiter: !!recruiter,
      worker: !!worker,
      client: !!client,
    },
  }
}

class AccountPasswordForm extends React.Component {
  static propTypes = {
    existingAccount: PropTypes.bool,
    handleSubmit: PropTypes.func,
    error: PropTypes.string,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    navigateToSelectMethod: PropTypes.func,
  }

  renderPasswordFieldset () {
    return (
      <div className={css.contentBlock}>
        <h2>Create Your Account Password</h2>
        <p>If you&quot;re new to block-chain create your Account password below.</p>

        <div className={css.passwordBlock}>
          <Field
            className={css.password}
            component={Input}
            type='password'
            name='password'
            placeholder='Password'
            mods={[css.passwordField]}
          />

          <Field
            className={css.password}
            component={Input}
            type='password'
            name='password-confirm'
            placeholder='Confirm Password'
            mods={[css.passwordField]}

          />
        </div>

        <div className={css.passwordBlockDescription}>
          By creating an Account you agree with our
          <br />
          <Link className={css.descriptionLink} href='/'>Privacy Policy</Link>
          &nbsp;and&nbsp;
          <Link className={css.descriptionLink} href='/'>Terms of Use</Link>
        </div>

      </div>
    )
  }

  render () {
    const { handleSubmit, error, pristine, invalid, navigateToSelectMethod } = this.props

    return (
      <form className={css.root} name={FORM_ACCOUNT_PASSWORD} onSubmit={handleSubmit}>
        <div className={css.contentBlock}>
          <h2>Select Account Type</h2>

          <p className={css.description}>You may also add account types any time in the future. Please select at least one now.</p>

          <div className={css.checkboxBlock}>
            <div className={css.row}>
              <Field
                id='recruiter'
                className={css.checkbox}
                component='input'
                type='checkbox'
                name='recruiter'
              />
              <label htmlFor='recruiter' className={css.checkboxLabel}>
                <strong>Recruiter</strong>
                Create and manage Job Boards
              </label>
            </div>

            <div className={css.row}>
              <Field
                id='worker'
                className={css.checkbox}
                component='input'
                type='checkbox'
                name='worker'
              />
              <label htmlFor='worker' className={css.checkboxLabel}>
                <strong>Worker</strong>
                Join Job Boards and start your job search
              </label>
            </div>

            <div className={css.row}>
              <Field
                id='client'
                className={css.checkbox}
                component='input'
                type='checkbox'
                name='client'
              />
              <label htmlFor='client' className={css.checkboxLabel}>
                <strong>Client</strong>
                Join Job Boards and post your jobs
              </label>
            </div>

          </div>
        </div>

        { this.props.existingAccount ? null : this.renderPasswordFieldset() }

        <Button
          className={css.row}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Create an Account'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
          errorClassName={css.formError}
        />

        <div className={css.pageDescription}>
          Have a Mnemonic key, Wallet File or Hardware solution?
          <br />
          <button onClick={navigateToSelectMethod} className={css.descriptionLink}>
            Use another Authorization Method
          </button>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_ACCOUNT_PASSWORD, validate, onSubmit })(AccountPasswordForm)
