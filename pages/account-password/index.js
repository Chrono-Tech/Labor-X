import React, { input } from 'react'
import Head from 'next/head'
import { reduxForm, Field } from 'redux-form'
import withRedux from 'next-redux-wrapper'

import { Link } from 'components/common'
import { AccountLayout } from 'components/layouts'
import { AccountPasswordForm } from 'components/Account'
import initialStore from 'store'

import 'styles/globals/globals.scss'
import validate from './validate'
import css from './index.scss'

const FORM_ACCOUNT_PASSWORD = 'form/accountPassword'

const onSubmit = () => {

}

class AccountPassword extends React.Component {
  
  render () {
    const { handleSubmit, error, pristine, invalid } = this.props
  
    return (
      <div className={css.root}>
        <Head>
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <AccountLayout title='Create New Acccount'>
          <AccountPasswordForm />

        </AccountLayout>
      </div>
    )
  }
}

export default withRedux(initialStore)(AccountPassword)
