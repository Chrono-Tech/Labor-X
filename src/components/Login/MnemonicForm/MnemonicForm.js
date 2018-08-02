import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { createAddressFromMnemonic  } from 'src/utils'

import { Button, Input } from 'components/common'
import SignInModel from 'models/SignInModel'
import { LoginSteps } from 'store'
import validate from './validate'

import css from './MnemonicForm.scss'

export const FORM_MNEMONIC = 'form/mnemonic'

class MnemonicForm extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func,
  }

  render () {
    const { handleSubmit, error, pristine, invalid, onChangeStep } = this.props

    return (
      <form className={css.root} name={FORM_MNEMONIC} onSubmit={handleSubmit}>
        <h3 className={css.header}>Mnemonic form</h3>
        <Field
          className={css.row}
          component={Input}
          name='mnemonic'
          placeholder='Enter mnemonic'
          autoComplete={false}
          mods={css.mnemonicField}
          lineEnabled={false}
        />
        <Button
          className={css.row}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Proceed to Login'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
        />
        <div className={css.otherActions}>
          or
          <button className={css.backButton} onClick={() => onChangeStep(LoginSteps.SelectLoginMethod)}>back</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_MNEMONIC, validate })(MnemonicForm)
