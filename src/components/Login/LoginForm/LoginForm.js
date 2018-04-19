import { Button, Input, Link, UserRow } from 'components/common'
import LogInModel from 'models/SignInModel'
import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import css from './LoginForm.scss'
import validate from './validate'

const FORM_LOGIN = 'form/login'

const onSubmit = ({ password }) => {
  
  return new LogInModel({
    address: '',
    password: password,
  })
}

class LoginForm extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
  }
  
  static defaultProps = {
    avatar: '/static/images/profile-photo.jpg',
    name: '',
    address: '',
  }

  render () {
    const { handleSubmit, error, pristine, invalid, name, address, avatar } = this.props
    
    return (
      <form className={css.root} name={FORM_LOGIN} onSubmit={handleSubmit}>
        <div className={css.formHeader}>Log In</div>
        <UserRow name='Emile' address='1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9' />
        <Field
          className={css.row}
          component={Input}
          name='password'
          placeholder={'Enter Password'}
          autoComplete={false}
          mods={[Input.MODS.INVERT, css.passwordField]}
        />
        <Button
          className={css.row}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Login'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
        />
        <div>
          <Link href='/forgot-password' className={css.forgotPasswordLink}>Forgot your password?</Link>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_LOGIN, validate, onSubmit })(LoginForm)
