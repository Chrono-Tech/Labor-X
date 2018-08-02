import React  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Checkbox } from 'redux-form-material-ui'
import { reduxForm, Field, getFormSyncErrors } from 'redux-form'

import { Link, Button, Input } from 'src/components/common'
import SignupLayout from 'src/components/layouts/SignupLayout/SignupLayout'
import { ACCOUNT_PASSWORD_FORM as FORM } from "src/store/signup/constants"
import { submitAccountPassword as submit } from "src/store/signup/actions"
import validate from './validate'

import css from './AccountPasswordContent.scss'

export class AccountPasswordContent extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.string),
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  render () {
    return (
      <div>
        <SignupLayout>
          <form className={css.root} name={FORM} onSubmit={this.props.handleSubmit}>
            <div className={css.contentBlock}>
              <h2>Select Account Type</h2>
              <p className={css.description}>You may also add account types any time in the future. Please select at least one now.</p>
              <div className={css.checkboxBlock}>
                <Field
                  className={css.checkbox}
                  name='roles.isRecruiter'
                  component={Checkbox}
                  label={<div className={css.checkboxLabel}><p><strong>Recruiter</strong></p><p>Create and manage Job Boards</p></div>}
                />
                <div className={css.checkbox}>
                  <Field
                    name='roles.isWorker'
                    component={Checkbox}
                    label={<div className={css.checkboxLabel}><p><strong>Worker</strong></p><p>Join Job Boards and start your job search</p></div>}
                  />
                </div>
                <div className={css.checkbox}>
                  <Field
                    name='roles.isClient'
                    component={Checkbox}
                    label={<div className={css.checkboxLabel}><p><strong>Client</strong></p><p>Join Job Boards and post your jobs</p></div>}
                  />
                </div>
                {this.props.errors.roles}
              </div>
            </div>
            <div className={css.contentBlock}>
              <h2>Create Your Account Password</h2>
              <p>If you&quot;re new to block-chain create your Account password below.</p>
              <div className={css.passwordBlock}>
                <Field
                  className={css.password}
                  component={Input}
                  type='text'
                  name='name'
                  placeholder='Account Name'
                  mods={[css.passwordField]}
                />
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
              <Button
                className={css.row}
                buttonClassName={css.submitButton}
                type={Button.TYPES.SUBMIT}
                label='Create an Account'
                primary
                disabled={this.props.pristine || this.props.invalid}
                error={this.props.error}
                mods={Button.MODS.INVERT}
                errorClassName={css.formError}
              />
            </div>
            <div className={css.pageDescription}>
              Have a Mnemonic key, Wallet File or Hardware solution?
              <br />
              <button className={css.descriptionLink}>
                Use another Authorization Method
              </button>
            </div>
          </form>
        </SignupLayout>
      </div>
    )
  }
}

AccountPasswordContent = reduxForm({
  form: FORM,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(AccountPasswordContent)

const mapStateToProps = (state) => ({
  initialValues: { roles: {} },
  errors: getFormSyncErrors(FORM)(state),
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: () => dispatch(submit()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPasswordContent)
