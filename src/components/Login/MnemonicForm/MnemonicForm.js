import bip39 from 'bip39'
import { Button, Input } from 'components/common'
import hdKey from 'ethereumjs-wallet/hdkey'
import SignInModel from 'models/SignInModel'
import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import css from './MnemonicForm.scss'
import validate from './validate'

const FORM_MNEMONIC = 'form/mnemonic'

const onSubmit = ({ mnemonic }) => {
  const wallet = hdKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic)).getWallet()

  return new SignInModel({
    isHD: true,
    address: wallet.getChecksumAddressString(),
    method: SignInModel.METHODS.MNEMONIC,
  })
}

class MnemonicForm extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
  }

  static STEP = 'step/LoginWithMnemonic'

  constructor () {
    super(...arguments)
    // eslint-disable-next-line
    console.log('test mnemonic: ', bip39.generateMnemonic())
  }

  render () {
    const prefix = this.constructor.name
    const { handleSubmit, error, pristine, invalid } = this.props

    return (
      <form className={css.root} name={FORM_MNEMONIC} onSubmit={handleSubmit}>
        <Field
          className={css.row}
          component={Input}
          name='mnemonic'
          placeholder={`${prefix}.enterMnemonic`}
          autoComplete={false}
          mods={Input.MODS.INVERT}
        />
        <Button
          className={css.row}
          type={Button.TYPES.SUBMIT}
          label='Login'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
        />
      </form>
    )
  }
}

export default reduxForm({ form: FORM_MNEMONIC, validate, onSubmit })(MnemonicForm)
