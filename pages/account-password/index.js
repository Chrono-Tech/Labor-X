import React, { input } from 'react'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'

import { Link } from 'components/common'
import { AccountLayout } from 'components/layouts'
import { AccountPasswordForm, ConfirmMnemonic, BackupWallet } from 'components/Account'
import initialStore from 'store'

import 'styles/globals/globals.scss'
import css from './index.scss'


class AccountPassword extends React.Component {
  
  render () {
    const { handleSubmit, error, pristine, invalid } = this.props
  
    return (
      <div className={css.root}>
        <Head>
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <AccountLayout title='Create New Acccount'>
          <div style={{display: 'none'}}>
            <AccountPasswordForm />
          </div>
  
          <div style={{display: 'none'}}>
            <ConfirmMnemonic />
          </div>
          
          <BackupWallet />
          

        </AccountLayout>
      </div>
    )
  }
}

export default withRedux(initialStore)(AccountPassword)
