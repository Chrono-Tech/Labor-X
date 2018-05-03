import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

import { Link } from 'components/common'
import 'styles/globals/globals.scss'
import css from './AccountLayout.scss'

export default class AccountLayout extends React.Component {

  render () {
    const { contentClassName, title } = this.props
    const contentClassNames = [css.main].concat(contentClassName)
    
    return (
      <div className={css.root}>
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
              { title ? (<h1>{ title }</h1>) : null }
            </div>
          </div>
          <div className={contentClassNames.join(' ')}>
            {this.props.children}
          </div>
          <Link href='/' className={css.footerLogo}>
            <img src='/static/images/svg/laborx-caption.svg' alt='' />
          </Link>
        </div>
      </div>
    )
  }
}
