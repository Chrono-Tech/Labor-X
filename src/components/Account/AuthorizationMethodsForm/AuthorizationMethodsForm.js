import React  from 'react'

import { Link } from 'components/common'

import 'styles/globals/globals.scss'

import css from './AuthorizationMethodsForm.scss'

export default class AuthorizationMethods extends React.Component {
  
  render () {
    
    return (
      <div className={css.root}>
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
    )
  }
}
