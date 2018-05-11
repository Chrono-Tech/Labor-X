import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import bip39 from 'bip39'

import { Button, Input } from 'components/common'
import ethereumService from 'services/EthereumService'
import SignInModel from 'src/models/SignInModel'
import { LoginSteps } from 'store'
import validate from './validate'

import css from './PrivateKeyForm.scss'

const FORM_PRIVATE_KEY = 'form/privateKey'

const onSubmit = ({key}) => {
  const address = ethereumService.createAddressFromPrivateKey(key)
  
  return new SignInModel({
    method: SignInModel.METHODS.PRIVATE_KEY,
    key: key,
    address,
  })
}

class PrivateKeyForm extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    console.log('test mnemonic: ', bip39.generateMnemonic())
  }

  render () {
    const { handleSubmit, error, invalid, pristine, onChangeStep } = this.props

    return (
      <form className={css.root} name={FORM_PRIVATE_KEY} onSubmit={handleSubmit}>
        <h3 className={css.header}>Private key form</h3>
        <Field
          component={Input}
          name='key'
          placeholder='Enter private key'
          label='Enter private key'
          className={css.input}
          autoComplete={false}
          lineEnabled={false}
          mods={css.keyField}
          materialInput={true}
        />
        <Button
          label='Login'
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          disabled={pristine || invalid}
          mods={Button.MODS.INVERT}
          error={error}
          primary
        />
        <div className={css.otherActions}>
          or
          <button className={css.backButton} onClick={() => onChangeStep(LoginSteps.SelectLoginMethod)}>back</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_PRIVATE_KEY, validate, onSubmit })(PrivateKeyForm)
