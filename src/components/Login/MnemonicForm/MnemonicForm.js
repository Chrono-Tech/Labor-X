import bip39 from 'bip39'
import { Button, Input } from 'components/common'
import hdKey from 'ethereumjs-wallet/hdkey'
import SignInModel from 'models/SignInModel'
import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import css from './MnemonicForm.scss'
import validate from './validate'
import Web3 from 'src/network/Web3Provider'

const FORM_MNEMONIC = 'form/mnemonic'

const onSubmit = ({ mnemonic }) => {
  let web3 = Web3.getWeb3()

  const account = web3.eth.accounts.privateKeyToAccount(`0x${bip39.mnemonicToSeedHex(mnemonic)}`)

  return new SignInModel({
    isHD: true,
    address: account.address,
    method: SignInModel.METHODS.MNEMONIC,
    key: mnemonic,
  })
}

class MnemonicForm extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    console.log('test mnemonic: ', bip39.generateMnemonic())
  }


  render () {
    const prefix = this.constructor.name
    const { handleSubmit, error, pristine, invalid, onChangeStep } = this.props

    return (
      <form className={css.root} name={FORM_MNEMONIC} onSubmit={handleSubmit}>
        <h3 className={css.header}>Mnemonic form</h3>
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
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Login'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
        />
        <div>
          or
          <button className={css.backButton} onClick={() => onChangeStep(null)}>back</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_MNEMONIC, validate, onSubmit })(MnemonicForm)
