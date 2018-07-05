import React  from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import Head from 'next/head'
// import bip39 from 'bip39'
//
// import { AccountLayout } from 'src/components/layouts'
// import { AccountPasswordForm, ShowMnemonic, ConfirmMnemonic, BackupWallet } from 'src/components/Account'
// import { setMnemonic, setPassword, setAccountTypes, createUserAccount, downloadWallet, onFinishCreateAccount, navigateToSelectMethod } from 'src/store'
//
// import css from './index.scss'
import CreateAccountContent from "../../src/content/lib/CreateAccountContent";

class CreateAccount extends React.Component {

  // constructor (){
  //   super()
  //
  //   this.state = {
  //     activePage: null,
  //   }
  // }
  //
  // static async getInitialProps ({ store }) {
  //   const mnemonic = bip39.generateMnemonic()
  //
  //   store.dispatch(setMnemonic(mnemonic))
  //   return { mnemonic }
  // }
  //
  // componentWillMount (){
  //   const { setMnemonic, mnemonic } = this.props
  //
  //   setMnemonic(mnemonic)
  // }
  //
  // onSubmitAccountPasswordForm ({ password, types }){
  //   const { setPassword, setAccountTypes } = this.props
  //
  //   setPassword(password)
  //   setAccountTypes(types)
  // }

  render () {
    // const { onFinishCreateAccount, downloadWallet, createUserAccount, navigateToSelectMethod } = this.props

    return (
      <div>
        <Head>
          <title>LaborX</title>
          <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <CreateAccountContent />
      </div>
    )
  }

}
//
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     setMnemonic,
//     setPassword,
//     setAccountTypes,
//     createUserAccount,
//     downloadWallet,
//     onFinishCreateAccount,
//     navigateToSelectMethod,
//   }, dispatch)
// }
//
// export default connect(null, mapDispatchToProps)(CreateAccount)

export default CreateAccount