import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import Chip from '@material-ui/core/Chip'
import CheckCircle from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import ErrorIcon from '@material-ui/icons/Error'
import FileUploadIcon from '@material-ui/icons/FileUpload'

import SigninLayout from "src/components/SigninLayout/SigninLayout";
import WhiteRoundedButton from "src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton";
import { walletSelector } from "src/store/homeFileLogin/selectors";
import { updateFile, deleteFile, submitFile } from "src/store/homeFileLogin/actions";
import { isFileValidSelector, updateFileFailureSelector, updateFileLoadingSelector } from "src/store/homeFileLogin";
import BlueRoundedButton from "src/components/common/buttons/BlueRoundedButton/BlueRoundedButton";

import css from './HomeFileLoginContent.pcss'


export class HomeFileLoginContent extends React.Component {

  handleFileChange = (e) => {
    const file = e.target.files[0]
    this.props.updateFile(file)
  }

  renderButton () {
    if (this.props.updateFileFailure || (this.props.wallet && !this.props.isFileValid)) {
      return (
        <Chip
          classes={{ root: classnames(css.chip, css.chipFailure), label: css.chipLabel }}
          avatar={<ErrorIcon className={css.icon} />}
          label="Invalid format"
          deleteIcon={<DeleteIcon className={css.icon} />}
          onDelete={this.props.deleteFile} />
      )
    } else if (!this.props.updateFileFailure && !this.props.wallet) {
      return (
        <BlueRoundedButton component='label' loader={this.props.updateFileLoading}>
          <FileUploadIcon className={css.icon} />
          &nbsp;
          Browse for a Wallet file
          <input type='file' style={{display:'none'}} onChange={this.handleFileChange} />
        </BlueRoundedButton>
      )
    } else {
      return (
        <Chip
          classes={{ root: classnames(css.chip, css.chipSuccess), label: css.chipLabel }}
          avatar={<CheckCircle className={css.icon} />}
          label="Wallet file has been uploaded"
          deleteIcon={<DeleteIcon className={css.icon} />}
          onDelete={this.props.deleteFile} />
      )
    }
  }

  render () {
    return (
      <div className={css.HomeFileLoginContent}>
        <SigninLayout title='Upload a Wallet File'>
          <p className={css.subheader}>Upload a wallet file to add the login information to your browser. We provide the file on New Account Creation.</p>
          <br/>
          <br/>
          <br/>
          <br/>
          { this.renderButton() }
          <br/>
          <br/>
          <br/>
          <br/>
          <WhiteRoundedButton
            disabled={!this.props.wallet || this.props.updateFileFailure || this.props.updateFileLoading || (this.props.wallet && !this.props.isFileValid)}
            onClick={this.props.submitFile}>Proceed to Login</WhiteRoundedButton>
          <br/>
          <br/>
          <br/>
          <br/>
          <div className={css.otherActions}>
            or
            <Link to='/my-accounts' className={css.backButton}>Back</Link>
          </div>
        </SigninLayout>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  wallet: walletSelector(state),
  updateFileLoading: updateFileLoadingSelector(state),
  updateFileFailure: updateFileFailureSelector(state),
  isFileValid: isFileValidSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  updateFile: (file) => dispatch(updateFile(file)),
  deleteFile: () => dispatch(deleteFile()),
  submitFile: () => dispatch(submitFile()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeFileLoginContent)


