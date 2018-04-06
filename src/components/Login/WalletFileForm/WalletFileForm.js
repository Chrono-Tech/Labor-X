import { Button, FileUploader, Input } from 'components/common'
import FileModel from 'models/FileModel'
import SignInModel from 'models/SignInModel'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import Accounts from 'web3-eth-accounts'
import validate from './validate'
import css from './WalletFileForm.scss'

const FORM_WALLET_FILE = 'form/walletFile'
const FIELD_WALLET_FILE = 'walletFile'
const FIELD_WALLET_PASSWORD = 'walletPassword'

function mapStateToProps (state) {
  const selector = formValueSelector(FORM_WALLET_FILE)
  return {
    walletFile: selector(state, FIELD_WALLET_FILE),
    password: selector(state, FIELD_WALLET_PASSWORD),
  }
}

const onSubmit = ({ walletFile, walletPassword }) => {
  try {
    const accounts = new Accounts()
    const encryptedWallet = accounts.wallet.decrypt([ walletFile.content ], walletPassword)[ 0 ]

    return new SignInModel({
      isHD: true,
      address: encryptedWallet.address,
      method: SignInModel.METHODS.WALLET,
    })
  } catch (e) {
    throw new SubmissionError({ _error: e.message })
  }

}

class WalletFileForm extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
    wallet: PropTypes.instanceOf(FileModel),
    password: PropTypes.string,
  }

  static STEP = 'step/LoginWithWallet'

  constructor () {
    super(...arguments)
    const accounts = new Accounts()
    const wallet = accounts.wallet.create(1)
    const walletJSON = wallet.encrypt('test')[ 0 ]
    // eslint-disable-next-line
    console.log('test wallet JSON: ', JSON.stringify(walletJSON))
  }

  render () {
    const prefix = this.constructor.name
    const { handleSubmit, invalid, pristine, walletFile, error } = this.props
    const isWallet = walletFile && !!walletFile.content

    return (
      <form className={css.root} name={FORM_WALLET_FILE} onSubmit={handleSubmit}>
        <Field
          className={css.row}
          name={FIELD_WALLET_FILE}
          component={FileUploader}
          label={`${prefix}.uploadWallet`}
          invert
        />
        <Field
          className={css.row}
          name={FIELD_WALLET_PASSWORD}
          component={Input}
          type={Input.TYPES.PASSWORD}
          placeholder={`${prefix}.enterWalletPassword`}
          mods={Input.MODS.INVERT}
          disabled={!isWallet}
        />
        <Button
          className={css.row}
          label={`${prefix}.login`}
          type={Button.TYPES.SUBMIT}
          disabled={pristine || invalid}
          error={error}
          color={Button.COLORS.PRIMARY}
          mods={Button.MODS.INVERT}
        />
      </form>
    )
  }
}

const form = reduxForm({ form: FORM_WALLET_FILE, validate, onSubmit })(WalletFileForm)
export default connect(mapStateToProps)(form)
