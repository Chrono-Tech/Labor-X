import { LoginActions } from 'components/layouts'
import { LoginForm } from 'components/Login'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import Head from 'next/head'
import initialStore from 'store'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import ethereumService from '../../src/services/EthereumService'
import css from './index.scss'

class AccountPassword extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  componentWillMount () {
    ethereumService.start()
  }

  render () {
    return (
      <div className={css.root}>
        <Head>
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <LoginActions>
          Create account password
        </LoginActions>
      </div>
    )
  }
}

export default withRedux(initialStore)(AccountPassword)
