import { Button, Input, Translate } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import ethereumService from 'services/EthereumService'
import SignInModel from '../../../models/SignInModel'
import css from './PrivateKeyForm.scss'
import validate from './validate'

const FORM_PRIVATE_KEY = 'form/privateKEy'

const onSubmit = (values) => {
  try {
    const address = ethereumService.createAddressFromPrivateKey(values.privateKey)
    return new SignInModel({
      method: SignInModel.METHODS.PRIVATE_KEY,
      address,
    })
  } catch (e) {
    // eslint-disable-next-line
    console.error('error private key', e.message)
  }
}

class PrivateKeyForm extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
  }

  static STEP = 'step/LoginWithPrivateKey'

  render () {
    const prefix = this.constructor.name
    const { handleSubmit, pristine, invalid } = this.props

    return (
      <form className={css.root} name={FORM_PRIVATE_KEY} onSubmit={handleSubmit}>
        <h3 className={css.title}><Translate value={`${prefix}.title`} /></h3>
        <Field
          component={Input}
          name='privateKey'
          placeholder={`${prefix}.enterPrivateKey`}
          className={css.input}
          autoComplete={false}
          mods={Input.MODS.INVERT}
        />
        <Button
          label='term.enter'
          type={Button.TYPES.SUBMIT}
          disabled={pristine || invalid}
        />
      </form>
    )
  }
}

export default reduxForm({ form: FORM_PRIVATE_KEY, validate, onSubmit })(PrivateKeyForm)
