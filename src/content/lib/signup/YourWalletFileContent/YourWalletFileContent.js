import React  from 'react'

import SignupLayout from 'src/components/layouts/SignupLayout/SignupLayout'

import 'styles/globals/globals.scss'
import css from './YourWalletFileContent.scss'
import {downloadWallet, generateMnemonic} from "../../../../store/signup/actions";

import {connect} from "react-redux";
import {submitYourWalletFile as submit} from "src/store/signup/actions";
export class YourWalletFileContent extends React.Component {

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

// const mapStateToProps = (state) => ({
//   mnemonic: mnemonicSelector(state)
// })

const mapDispatchToProps = (dispatch) => ({
  downloadWallet: () => dispatch(downloadWallet()),
  submit: () => dispatch(submit())
})

YourWalletFileContent = connect(null, mapDispatchToProps)(YourWalletFileContent)

export default YourWalletFileContent
