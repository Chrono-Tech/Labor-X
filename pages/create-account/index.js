import React  from 'react'
import { bindActionCreators } from 'redux'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import bip39 from 'bip39'

import { Link } from 'components/common'
import { AccountLayout } from 'components/layouts'
import { AccountPasswordForm, ShowMnemonic, ConfirmMnemonic, BackupWallet } from 'components/Account'
import initialStore, { setMnemonic, setPassword, setAccountTypes, createUserAccount, downloadWallet, onFinishCreateAccount } from 'store'

import 'styles/globals/globals.scss'
import css from './index.scss'

class CreateAccount extends React.Component {
  
  constructor(){
    super()
    
    this.state = {
      activePage: null,
    }
  }
  
  static async getInitialProps({ store }) {
    const mnemonic = bip39.generateMnemonic()
    
    store.dispatch(setMnemonic(mnemonic))
    return { mnemonic }
  }
  
  componentWillMount(){
    const { setMnemonic, mnemonic } = this.props
    
    setMnemonic(mnemonic)
  }
  
  onSubmitAccountPasswordForm({password, types}){
    const {setPassword, setAccountTypes} = this.props
  
    setPassword(password)
    setAccountTypes(types)
  }
  
  render () {
    const { onFinishCreateAccount, downloadWallet, createUserAccount } = this.props
  
    return (
      <div className={css.root}>
        <Head>
          <title>LaborX</title>
          <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <AccountLayout title='Create New Acccount'>
          <AccountPasswordForm onSubmitSuccess={this.onSubmitAccountPasswordForm.bind(this)} />
          <ShowMnemonic />
          <ConfirmMnemonic onSubmitSuccess={createUserAccount} />
          <BackupWallet onClickDownload={downloadWallet} onClickFinish={onFinishCreateAccount} />
        </AccountLayout>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setMnemonic,
    setPassword,
    setAccountTypes,
    createUserAccount,
    downloadWallet,
    onFinishCreateAccount,
  }, dispatch)
}

export default withRedux(initialStore, null, mapDispatchToProps)(CreateAccount)
