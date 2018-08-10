import React from 'react'
import classnames from 'classnames'

import SigninLayout from "src/components/layouts/SigninLayout/SigninLayout"
import { Link } from 'src/components/common/index'

import css from './AuthImportSelectMethodContent.scss'

export class AuthImportSelectMethodContent extends React.Component {

  render () {
    return (
      <SigninLayout>
        <div>
          <Link className={css.helpLink} href='/'>
            <img src='/static/images/svg/help-white.svg' width='48' height='48' alt='' />
          </Link>
          <div className={css.pageHeader}>Add an existing account</div>
          <div className={css.buttonsWrapper}>
            <Link href='/auth/import/ledger'>
              <button className={css.methodButton}>
                <img src='/static/images/svg/ledger-nano.svg' width='48' height='48' alt='' />
                LedgerNano
              </button>
            </Link>
            <Link href='/auth/import/trezor'>
              <button className={css.methodButton}>
                <img src='/static/images/svg/trezor.svg' width='48' height='48' alt='' />
                Trezor
              </button>
            </Link>
            <Link href='/auth/import/plugin'>
              <button className={css.methodButton}>
                <img src='/static/images/svg/plugin.svg' width='48' height='48' alt='' />
                Browser Plug-in
              </button>
            </Link>
            <Link href='/auth/import/seed'>
              <button className={css.methodButton}>
                <img src='/static/images/svg/mnemonic.svg' width='48' height='48' alt='' />
                Mnemonic
              </button>
            </Link>
            <Link href='/auth/import/pkey'>
              <button className={css.methodButton}>
                <img src='/static/images/svg/key.svg' width='48' height='48' alt='' />
                Private key
              </button>
            </Link>
            <Link href='/auth/import/file'>
              <button className={css.methodButton}>
                <img src='/static/images/svg/wallet.svg' width='48' height='48' alt='' />
                Wallet file
              </button>
            </Link>
            <Link href='/auth/import/uport'>
              <button className={classnames(css.methodButton, css.uportButton)}>
                <img src='/static/images/svg/wallet.svg' width='48' height='48' alt='' />
                Uport
              </button>
            </Link>
          </div>
          <div className={css.otherActions}>
            or
            <Link href='/auth/signin/my-accounts'><button className={css.backButton}>Back</button></Link>
          </div>
        </div>
      </SigninLayout>
    )
  }

}

export default AuthImportSelectMethodContent
