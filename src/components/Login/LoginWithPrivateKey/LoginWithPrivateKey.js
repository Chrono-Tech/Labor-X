import { Button, Input } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import { reduxForm, Field } from 'redux-form'
import css from './LoginWithPrivateKey.scss'
import validate from './validate'

const FORM_PRIVATE_KEY = 'form/privateKEy'

const onSubmit = (values) => {
  console.log('--LoginWithPrivateKey#onSubmit', values)
}

class LoginWithPrivateKey extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
  }

  static STEP = 'step/LoginWithPrivateKey'

  handleBackClick = () => this.props.onChangeStep(null)

  render () {
    return (
      <form name={FORM_PRIVATE_KEY} onSubmit={this.props.handleSubmit}>
        <h3 className={css.title}>Log In</h3>
        <Field
          component={Input}
          name='privateKey'
          placeholder='Enter Private Key'
          className={css.input}
          invert
        />
        <Button
          label='Back'
          type={Button.TYPES.SUBMIT}
          onClick={this.handleBackClick}
        />
      </form>
    )
  }
}

export default reduxForm({ form: FORM_PRIVATE_KEY, validate, onSubmit })(LoginWithPrivateKey)
