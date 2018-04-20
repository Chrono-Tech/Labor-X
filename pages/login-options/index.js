import { Link } from 'components/common'
import { LoginLayout, Footer, LoginActions } from 'components/layouts'
import { LoginOptions, LearnMoreBlock } from 'components/Login'
import withRedux from 'next-redux-wrapper'
import React from 'react'
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
        <LoginActions contentClassName={css.contentGradient}>
          <Link className={css.helpLink} href='/'>
            <img src='/static/images/svg/help-white.svg' alt='' />
          </Link>
          <div className={css.pageHeader}>Add an existing account</div>
          <div className={css.buttonsWrapper}>
            <button className={css.methodButton}>
              <img src='/static/images/svg/ledger-nano.svg' alt='' />
              LedgerNano
            </button>
            <button className={css.methodButton}>
              <img src='/static/images/svg/trezor.svg' alt='' />
              Trezor
            </button>
            <button className={[css.methodButton, css.pluginButton].join(' ')}>
              <img src='/static/images/svg/plugin.svg' alt='' />
              Browser Plug-in
            </button>
            <button className={css.methodButton}>
              <img src='/static/images/svg/mnemonic.svg' alt='' />
              Mnemonic
            </button>
            <button className={css.methodButton}>
              <img src='/static/images/svg/key.svg' alt='' />
              Private key
            </button>
            <button className={[css.methodButton, css.walletButton].join(' ')}>
              <img src='/static/images/svg/wallet.svg' alt='' />
              Wallet file
            </button>
          </div>
        </LoginActions>
      </div>
    )
  }
}

export default withRedux(initialStore)(Index)
