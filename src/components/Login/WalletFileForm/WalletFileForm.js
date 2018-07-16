import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import uniqid from 'uniqid'
import { connect } from 'react-redux'
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form'
import FileModel from 'models/FileModel'
import { WalletEntryModel } from 'src/models'
import { LoginSteps } from 'store'
import { Button, FileUploader } from 'components/common'
import css from './WalletFileForm.scss'
import validate from './validate'

const FORM_WALLET_FILE = 'form/walletFile'
const FIELD_WALLET_FILE = 'walletFile'

function mapStateToProps (state) {
  const selector = formValueSelector(FORM_WALLET_FILE)
  return {
    walletFile: selector(state, FIELD_WALLET_FILE),
  }
}

const onSubmit = ({ walletFile }) => {
  try {
    const wallet = JSON.parse(atob(walletFile.content.split(',')[1]))

    return new WalletEntryModel({
      key: uniqid(),
      name: walletFile.name,
      encrypted: [wallet],
    })
  } catch (e) {
    throw new SubmissionError({ _error: e.message })
  }
}

class WalletFileForm extends React.Component {
  static propTypes = {
    onChangeStep: PropTypes.func.isRequired,
    wallet: PropTypes.instanceOf(FileModel),
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    error: PropTypes.bool,
  }

  static STEP = 'step/LoginWithWallet'

  handleBack = () => this.props.onChangeStep(LoginSteps.SelectLoginMethod)

  render () {
    const prefix = this.constructor.name
    const { handleSubmit, invalid, pristine, error } = this.props

    return (
      <form className={css.root} name={FORM_WALLET_FILE} onSubmit={handleSubmit}>
        <h3>Upload a Wallet File</h3>
        <p>Upload a wallet file to add the login information to your browser. We provide the file <br />on New Account Creation.</p>
        <Field
          className={cn(css.row, css.uploadField)}
          name={FIELD_WALLET_FILE}
          component={FileUploader}
          label={`${prefix}.uploadWallet`}
          invert
        />
        <Button
          className={cn(css.row, css.loginButton)}
          label={`${prefix}.login`}
          type={Button.TYPES.SUBMIT}
          disabled={pristine || invalid}
          error={error}
          errorClassName={css.error}
          color={Button.COLORS.PRIMARY}
          mods={Button.MODS.INVERT}
        />
        <div className={css.otherActions}>
          or
          <button className={css.backButton} onClick={this.handleBack}>Back</button>
        </div>
      </form>
    )
  }
}

const form = reduxForm({ form: FORM_WALLET_FILE, validate, onSubmit })(WalletFileForm)
export default connect(mapStateToProps)(form)
