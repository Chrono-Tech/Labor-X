import { Link } from 'components/common'
import { LoginLayout, Footer, LoginActions } from 'components/layouts'
import { LoginOptions, LearnMoreBlock } from 'components/Login'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import Head from 'next/head'
import initialStore from 'store'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import ethereumService from '../../src/services/EthereumService'
import css from './index.scss'

class Index extends React.Component {
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
        <div className={css.contentWrapper}>
          <Link href='/' className={css.logo}>
            <img src='/static/images/laborx-login-head.jpg' alt='' />
          </Link>
          <div className={css.loginWrapper}>
            <LoginOptions />
          </div>
          <img src='/static/images/laborx-login-hour.jpg' className={css.backgroundImage} alt=''/>
          <div className={css.forNewUsersBlock}>
            <div className={css.gradientBlock}/>
            <LearnMoreBlock/>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default withRedux(initialStore)(Index)
