import React from 'react'
import classnames from 'classnames'
import connect from 'react-redux/lib/connect/connect'
import Link from 'react-router-dom/Link'
import PropTypes from "prop-types"
import Chip from '@material-ui/core/Chip'
import CheckCircle from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import ErrorIcon from '@material-ui/icons/Error'
import FileUploadIcon from '@material-ui/icons/FileUpload'

import SigninLayout from "src/components/layouts/SigninLayout/SigninLayout"
import WhiteRoundedButton from "src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton"
import BlueRoundedButton from "src/components/common/buttons/BlueRoundedButton/BlueRoundedButton"
import Person404Dialog from 'src/components/dialogs/Person404Dialog/Person404Dialog'
import {
  updateEncryptedWallet,
  deleteEncryptedWallet,
  submitFile as submit,
  submitFilePerson404 as submitPerson404,
  hidePerson404Dialog,
} from "src/store/auth/import/actions"
import {
  updateEncryptedWalletLoadingSelector,
  updateEncryptedWalletFailureSelector,
  encryptedWalletSelector,
  openPerson404DialogSelector,
  isEcnryptedWalletValidSelector,
} from "src/store/auth/import/selectors"

import css from './AuthImportFileContent.scss'

export class AuthImportFileContent extends React.Component {

  static propTypes = {
    submitPerson404: PropTypes.func.isRequired,
    hidePerson404Dialog: PropTypes.func.isRequired,
    deleteEncryptedWallet: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    updateEncryptedWalletFailure: PropTypes.instanceOf(Error),
    del: PropTypes.func.isRequired,
    updateEncryptedWallet: PropTypes.func.isRequired,
    updateEncryptedWalletLoading: PropTypes.bool.isRequired,
    openPerson404Dialog: PropTypes.bool.isRequired,
    isFileValid: PropTypes.bool.isRequired,
    encryptedWallet: PropTypes.shape({}).isRequired,
  }

  handleFileChange = (e) => {
    const file = e.target.files[0]
    this.props.updateEncryptedWallet(file)
  }

  renderButton () {
    if (this.props.updateEncryptedWalletFailure || (this.props.encryptedWallet && !this.props.isFileValid)) {
      return (
        <Chip
          classes={{ root: classnames(css.chip, css.chipFailure), label: css.chipLabel }}
          avatar={<ErrorIcon className={css.icon} />}
          label='Invalid format'
          deleteIcon={<DeleteIcon className={css.icon} />}
          onDelete={this.props.deleteEncryptedWallet}
        />
      )
    } else if (!this.props.updateEncryptedWalletFailure && !this.props.encryptedWallet) {
      return (
        <BlueRoundedButton component='label' loader={this.props.updateEncryptedWalletLoading}>
          <FileUploadIcon className={css.icon} />
          &nbsp;
          Browse for a Wallet file
          <input type='file' name='encryptedWallet' style={{ display:'none' }} onChange={this.handleFileChange} />
        </BlueRoundedButton>
      )
    } else {
      return (
        <Chip
          classes={{ root: classnames(css.chip, css.chipSuccess), label: css.chipLabel }}
          avatar={<CheckCircle className={css.icon} />}
          label='Wallet file has been uploaded'
          deleteIcon={<DeleteIcon className={css.icon} />}
          onDelete={this.props.del}
        />
      )
    }
  }

  render () {
    return (
      <SigninLayout>
        <div className={css.root}>
          <h3 className={css.header}>Upload a Wallet File</h3>
          <p className={css.subheader}>Upload a wallet file to add the login information to your browser. We provide the file on New Account Creation.</p>
          <br />
          <br />
          <br />
          { this.renderButton() }
          <br />
          <br />
          <br />
          <WhiteRoundedButton
            disabled={(
              !this.props.encryptedWallet ||
              this.props.updateEncryptedWalletFailure ||
              this.props.updateEncryptedWalletLoading ||
              (this.props.encryptedWallet && !this.props.isFileValid)
            )}
            onClick={this.props.submit}
          >Proceed to Login
          </WhiteRoundedButton>
          <br />
          <br />
          <br />
          <br />
          <div className={css.otherActions}>
            or
            <Link to='/auth/import/select-method'><button className={css.backButton}>back</button></Link>
          </div>
        </div>
        <Person404Dialog
          open={this.props.openPerson404Dialog}
          onClose={this.props.hidePerson404Dialog}
          onSubmit={this.props.submitPerson404}
        />
      </SigninLayout>
    )
  }

}

const mapStateToProps = (state) => ({
  updateEncryptedWalletLoading: updateEncryptedWalletLoadingSelector(state),
  updateEncryptedWalletFailure: updateEncryptedWalletFailureSelector(state),
  encryptedWallet: encryptedWalletSelector(state),
  isFileValid: isEcnryptedWalletValidSelector(state),
  openPerson404Dialog: openPerson404DialogSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  updateEncryptedWallet: (file) => dispatch(updateEncryptedWallet(file)),
  deleteEncryptedWallet: () => dispatch(deleteEncryptedWallet()),
  submit: () => dispatch(submit()),
  submitPerson404: () => dispatch(submitPerson404()),
  hidePerson404Dialog: () => dispatch(hidePerson404Dialog()),
})

AuthImportFileContent = connect(mapStateToProps, mapDispatchToProps)(AuthImportFileContent)

export default AuthImportFileContent
