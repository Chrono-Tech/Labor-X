import React  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Checkbox } from 'redux-form-material-ui-next'
import { reduxForm, Field } from 'redux-form'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { Link, Button, Input } from 'src/components/common'
import SignupLayout from 'src/components/layouts/SignupLayout/SignupLayout'
import { ACCOUNT_PASSWORD_FORM as FORM } from "src/store/auth/signup/constants"
import { submitAccountPassword as submit } from "src/store/auth/signup/actions"
import validate from './validate'

import css from './AccountPasswordContent.scss'
import { encryptedWalletSelector } from "../../../../../store/auth/import/selectors"
import { required } from "../../../../../utils/validator"

export class AccountPasswordContent extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.string),
    pristine: PropTypes.bool.isRequired,
    submitted: PropTypes.bool.isRequired,
    encryptedWallet: PropTypes.shape({}).isRequired,
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
                <FormControlLabel
                  control={<Field color='primary' name='isRecruiter' component={Checkbox} />}
                  label={<div className={css.checkboxLabel}><p><strong>Recruiter</strong></p><p>Create and manage Job Boards</p></div>}
                />
                <FormControlLabel
                  control={<Field color='primary' name='isWorker' component={Checkbox} />}
                  label={<div className={css.checkboxLabel}><p><strong>Worker</strong></p><p>Join Job Boards and start your job search</p></div>}
                />
                <FormControlLabel
                  control={<Field color='primary' name='isClient' component={Checkbox} />}
                  label={<div className={css.checkboxLabel}><p><strong>Client</strong></p><p>Join Job Boards and post your jobs</p></div>}
                />
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
                  validate={[required]}
                />
                <Field
                  className={css.password}
                  component={Input}
                  type='password'
                  name='password'
                  placeholder='Password'
                  mods={[css.passwordField]}
                  validate={[required]}
                />
                {
                  this.props.encryptedWallet ? null : (
                    <Field
                      className={css.password}
                      component={Input}
                      type='password'
                      name='password-confirm'
                      placeholder='Confirm Password'
                      mods={[css.passwordField]}
                      validate={[required]}
                    />
                  )
                }
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
                disabled={this.props.invalid}
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
  validate,
})(AccountPasswordContent)

const mapStateToProps = (state) => ({
  initialValues: { isClient: false, isRecruiter: false, isWorker: false },
  encryptedWallet: encryptedWalletSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: () => dispatch(submit()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPasswordContent)
