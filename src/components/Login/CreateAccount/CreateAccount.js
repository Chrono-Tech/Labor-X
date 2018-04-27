import { Button, Input, Link, UserRow } from 'components/common'
import LogInModel from 'models/SignInModel'
import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import css from './CreateAccount.scss'
import validate from './validate'

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
          mods={Input.MODS.INVERT}
        />
        <Field
          className={css.row}
          component={Input}
          name='password'
          placeholder='Password'
          autoComplete={false}
          mods={[Input.MODS.INVERT, css.passwordField]}
        />
        <Field
          className={css.row}
          component={Input}
          name='passwordConfirm'
          placeholder='Password confirmation'
          autoComplete={false}
          mods={[Input.MODS.INVERT, css.passwordField]}
        />
        <Button
          className={css.row}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Create a wallet'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
        />
        <div>
          or
          <button onClick={} className={css.forgotPasswordLink}>Use an existing wallet</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_LOGIN, validate, onSubmit })(CreateAccount)
