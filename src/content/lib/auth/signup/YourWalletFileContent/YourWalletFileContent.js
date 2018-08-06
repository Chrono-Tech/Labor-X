import React  from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"

import SignupLayout from 'src/components/layouts/SignupLayout/SignupLayout'
import { submitYourWalletFile as submit, downloadWallet } from "src/store/auth/signup/actions"

import css from './YourWalletFileContent.scss'

export class YourWalletFileContent extends React.Component {

  static propTypes = {
    submit: PropTypes.func.isRequired,
    downloadWallet: PropTypes.func.isRequired,
  }

  render () {
    return (
      <div>
        <SignupLayout>
          <div className={css.root}>
            <h2>Your Wallet File</h2>
            <p className={css.description}>
              You can use this wallet file in login recovery option to make your account available in another browser,
              for example. The file is
              <br />
              protected by the same password as your created before.
            </p>
            <div>
              <button className={css.link} onClick={this.props.downloadWallet}>Download Wallet File</button>
            </div>
            <div>
              <button className={css.submitButton} onClick={this.props.submit}>FINISH</button>
            </div>
            <div className={css.progressBlock}>
              <div className={css.progressPoint} />
              <div className={css.progressPoint} />
              <div className={css.progressPoint} />
            </div>
          </div>
        </SignupLayout>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => ({
  downloadWallet: () => dispatch(downloadWallet()),
  submit: () => dispatch(submit()),
})

YourWalletFileContent = connect(null, mapDispatchToProps)(YourWalletFileContent)

export default YourWalletFileContent
