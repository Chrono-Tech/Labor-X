import { Button } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Accounts from 'web3-eth-accounts'
import FileUploader from '../../common/FileUploader/FileUploader'
import validate from '../PrivateKeyForm/validate'

const FORM_WALLET_FILE = 'form/walletFile'

const onSubmit = (values) => {
  try {
    // const address = ethereumService.createAddressFromPrivateKey(values.privateKey)
    // return new SignInModel({
    //   method: SignInModel.METHODS.PRIVATE_KEY,
    //   address,
    // })
    console.log('--WalletFileForm#onSubmit', values)
  } catch (e) {
    // eslint-disable-next-line
    console.error('error wallet file', e.message)
  }
}

class WalletFileForm extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
  }

  constructor () {
    super(...arguments)
    this.state = {
      wallet: null,
    }
  }

  static STEP = 'step/LoginWithWallet'

  handleGenerateWallet = () => {
    const accounts = new Accounts()
    const wallet = accounts.wallet.create(1)
    const walletJSON = wallet.encrypt('test')[ 0 ]
    this.setState({ wallet: walletJSON })
    console.log('--WalletFileForm#handleGenerateWallet', walletJSON, accounts)
  }

  render () {
    return (
      <form name={FORM_WALLET_FILE} onSubmit={this.props.handleSubmit}>
        generated: {JSON.stringify(this.state.wallet)}
        <Field
          name='walletFile'
          component={FileUploader}
          label='Upload Wallet'
        />
        <Button
          label='Generate wallet'
          onClick={this.handleGenerateWallet}
        />
      </form>
    )
  }
}

export default reduxForm({ form: FORM_WALLET_FILE, validate, onSubmit })(WalletFileForm)
