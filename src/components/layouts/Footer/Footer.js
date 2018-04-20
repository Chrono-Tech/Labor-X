import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'components/common'

import css from './Footer.scss'

export default class Footer extends React.Component {
  static propTypes = {
    footerClass: PropTypes.string,
  }
  render (){
    return (
      <div className={css.footer}>
        <Link href='/' className={css.footerLogo}>
          <img src='/static/images/labor-x-logo.svg' alt='' />
        </Link>
        <ul className={css.footerMenu}>
          <li><Link href='/'>LaborX Whitepaper</Link></li>
          <li><Link href='/'>Chronobank Whitepaper</Link></li>
          <li><Link href='/'>Q&A</Link></li>
          <li><Link href='/'>Privacy Policy</Link></li>
          <li><Link href='/'>Terms of Use</Link></li>
        </ul>
        <div className={css.footerCopyright}>© 2018 LaborX</div>
      </div>
    )
  }
}
