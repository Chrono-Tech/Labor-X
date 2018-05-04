import React  from 'react'

import { Link } from 'components/common'

import 'styles/globals/globals.scss'

import css from './BackupWallet.scss'

export default class BackupWallet extends React.Component {
  
  render () {
    const { handleSubmit, error, pristine, invalid } = this.props
    
    return (
      <div className={css.root}>
        <h2>Your Wallet File</h2>
        
        <p className={css.description}>
          You can use this wallet file in login recovery option to make your account available in another browser,
          for example. The file is
          <br />
          protected by the same password as your created before.
        </p>
        
        <div>
          <Link className={css.link} href='/'>Download Wallet File</Link>
        </div>
        
        <div>
          <button className={css.submitButton}>Finish</button>
        </div>
  
        <div className={css.progressBlock}>
          <div className={css.progressPoint} />
          <div className={css.progressPoint} />
          <div className={css.progressPoint} />
        </div>
        
      </div>
    )
  }
}
