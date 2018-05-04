import React  from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { Link, Button, Input  } from 'components/common'
import validate from './validate'

import 'styles/globals/globals.scss'

import css from './AccountPasswordForm.scss'

const FORM_ACCOUNT_PASSWORD = 'form/accountPassword'

const onSubmit = () => {

}

class AccountPasswordForm extends React.Component {
  
  render () {
    const { handleSubmit, error, pristine, invalid, navigateNext, navigateBack } = this.props
    
    return (
      <form className={css.root} name={FORM_ACCOUNT_PASSWORD} onSubmit={handleSubmit}>
        <div className={css.contentBlock}>
          <h2>Select Account Type</h2>
          
          <p className={css.description}>You may also add account types any time in the future. Please select at least one now.</p>
      
          <div className={css.checkboxBlock}>
            <div className={css.row}>
              <Field id='recruiter' className={css.checkbox} component='input' type='checkbox' name='recruiter' />
              <label htmlFor='recruiter' className={css.checkboxLabel}>
                <strong>Recruiter</strong>
                Create and manage Job Boards
              </label>
            </div>
            
            <div className={css.row}>
              <Field id='worker' className={css.checkbox} component='input' type='checkbox' name='worker' />
              <label htmlFor='worker' className={css.checkboxLabel}>
                <strong>Worker</strong>
                Join Job Boards and start your job search
              </label>
            </div>
            
            <div className={css.row}>
              <Field id='client' className={css.checkbox} component='input' type='checkbox' name='client' />
              <label htmlFor='client' className={css.checkboxLabel}>
                <strong>Client</strong>
                Join Job Boards and post your jobs
              </label>
            </div>
            
          </div>
        </div>
        
        <div className={css.contentBlock}>
          <h2>Create Account Password</h2>
          <p>If you're new to block-chain create your Account password below.</p>
  
          <div className={css.passwordBlock}>
            <Field
              className={css.password}
              component='input'
              type='password'
              name='password'
              placeholder='Password'
            />
  
            <Field
              className={css.password}
              component='input'
              type='password'
              name='password-confirm'
              placeholder='Confirm Password'
            />
          </div>
  
          <div className={css.passwordBlockDescription}>
            By creating an Account you agree with our
            <br />
            <Link className={css.descriptionLink} href='/'>Privacy Policy</Link>
            &nbsp;and&nbsp;
            <Link className={css.descriptionLink} href='/'>Terms of Use</Link>
          </div>
          
          <button className={css.submitButton} disabled={pristine || invalid}>
            Create an Account
          </button>
          
        </div>
        
        <div className={css.pageDescription}>
          Have a Mnemonic key, Wallet File or HD solution?
          <br />
          <Link className={css.descriptionLink} href='/'>Use another Authorization Method</Link>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mnemonic: state.createAccount.mnemonic
  }
}

const form = reduxForm({ form: FORM_ACCOUNT_PASSWORD, validate, onSubmit })(AccountPasswordForm)
export default connect(mapStateToProps)(form)
