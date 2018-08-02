import React from 'react'
import Link from 'react-router-dom/Link'
import Grid from '@material-ui/core/Grid'

import SigninLayout from "src/components/SigninLayout/SigninLayout";

import css from './HomeLoginMethodsContent.pcss'

export class HomeLoginMethodsContent extends React.Component {

  render () {
    return (
      <div className={css.HomeLoginMethodsContent}>
        <SigninLayout title='Add an existing LaborX account'>
          <div className={css.buttonsWrapper}>
            <Grid container spacing={10}>
              <Grid item xs={4}>
                <Link to='/home-ledger-nano-login'>
                  <button className={css.methodButton}>
                    <img src='/static/images/svg/ledger-nano.svg' width='48' height='48' alt='' />
                    LedgerNano
                  </button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link to='/home-trezor-login'>
                  <button className={css.methodButton}>
                    <img src='/static/images/svg/trezor.svg' width='48' height='48' alt='' />
                    Trezor
                  </button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link to='/home-browser-plugin-login'>
                  <button className={[css.methodButton, css.pluginButton].join(' ')}>
                    <img src='/static/images/svg/plugin.svg' width='48' height='48' alt='' />
                    Browser Plug-in
                  </button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link to='/home-mnemonic-login'>
                  <button className={css.methodButton}>
                    <img src='/static/images/svg/mnemonic.svg' width='48' height='48' alt='' />
                    Mnemonic
                  </button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link to='/home-private-key-login'>
                  <button className={css.methodButton}>
                    <img src='/static/images/svg/key.svg' width='48' height='48' alt='' />
                    Private key
                  </button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link to='/home-file-login'>
                  <button className={[css.methodButton, css.walletButton].join(' ')}>
                    <img src='/static/images/svg/wallet.svg' width='48' height='48' alt='' />
                    Wallet file
                  </button>
                </Link>
              </Grid>
            </Grid>
          </div>
          <div className={css.otherActions}>
            or
            <Link to='/my-accounts' className={css.backButton}>Back</Link>
          </div>
        </SigninLayout>
      </div>
    )
  }
}

export default HomeLoginMethodsContent

