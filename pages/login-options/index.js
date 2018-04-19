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
          <div className={css.header}>
            <div className={css.headerInner}>
              <Link href='/'>
                <img src='/static/images/svg/laborx-white.svg' alt='' />
              </Link>
            </div>
          </div>
          <div className={css.topSection}>
            <img className={css.background} src='/static/images/city-5.jpg' alt='' />
            
            <div className={css.topSectionBlock}>
              <Link href='/' className={css.backLink}>
                <img src='/static/images/svg/back.svg' alt='' />
              </Link>
  
              <Link href='/' className={css.helpLink}>
                <img src='/static/images/svg/help-white.svg' alt='' />
              </Link>
              <h1>Create New Account</h1>
            </div>
          </div>
          <div className={css.main}>
            <h2>Select Authorization Method</h2>
  
            <p className={css.pageDescription}>If you have your wallet select one of the methods below.</p>
  
            <div className={css.buttonsWrapper}>
              <button className={css.methodButton}>
                <img src='/static/images/svg/ledger-nano.svg' alt='' />
                LedgerNano
              </button>
              <button className={css.methodButton}>
                <img src='/static/images/svg/trezor.svg' alt='' />
                Trezor
              </button>
              <button className={css.methodButton}>
                <img src='/static/images/svg/plugin.svg' alt='' />
                Browser Plug-in
              </button>
              <br/>
              <button className={css.methodButton}>
                <img src='/static/images/svg/mnemonic.svg' alt='' />
                Mnemonic
              </button>
              <button className={css.methodButton}>
                <img src='/static/images/svg/key.svg' alt='' />
                Private key
              </button>
              <button className={css.methodButton}>
                <img src='/static/images/svg/wallet.svg' alt='' />
                Wallet file
              </button>
            </div>
            
            <p className={css.createAccountDescription}>New to LaborX and block-chain?</p>
  
            <Link href='/' className={css.createAccountLink}>Create a New Account</Link>
          </div>
          <Link href='/' className={css.footerLogo}>
            <img src='/static/images/svg/laborx-caption.svg' alt='' />
          </Link>
        </div>
      </div>
    )
  }
}

export default withRedux(initialStore)(Index)
