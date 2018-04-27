import { Button, Input, Link, UserRow } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import css from './RecoveryAccountForm.scss'
import validate from './validate'

const FORM_LOGIN = 'form/login'

const onSubmit = ({ words }) => {

  return {}
}

class RecoveryAccountForm extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  render () {
    const { handleSubmit, error, pristine, invalid } = this.props
    const wordsArray = new Array(12).fill()

    return (
      <form className={css.root} name={FORM_LOGIN} onSubmit={handleSubmit}>
        <div className={css.formHeader}>Recover Account</div>
        <UserRow title='1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9' />

        <div className={css.fieldWrapper}>
          {
            wordsArray.map((item, index) =>
              (<Field
                key={index}
                className={css.word}
                component={Input}
                name={`word ${index}`}
                placeholder={`word ${index + 1}`}
                autoComplete={false}
                mods={Input.MODS.INVERT}
              />)
            )
          }

        </div>
        <Button
          className={css.row}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Proceed'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
        />
        <p className={css.descriptionBlock}>or <Link className={css.loginLink} href='/login'>Login</Link></p>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_LOGIN, validate, onSubmit })(RecoveryAccountForm)
