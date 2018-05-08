import React  from 'react'
import { bindActionCreators } from 'redux'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'

import { Link } from 'components/common'
import { AccountLayout } from 'components/layouts'
import { AuthorizationMethodsForm } from 'components/Account'
import initialStore, { } from 'store'

import 'styles/globals/globals.scss'
import css from './index.scss'

class AuthorizationMethods extends React.Component {

  render () {
    
    return (
      <div className={css.root}>
        <Head>
          <title>LaborX</title>
          <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <AccountLayout title='Create New Acccount'>
          <AuthorizationMethodsForm />
        </AccountLayout>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}

export default withRedux(initialStore, null, mapDispatchToProps)(AuthorizationMethods)
