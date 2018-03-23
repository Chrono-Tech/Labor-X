import { Link } from 'components/common'
import React from 'react'
import css from './FirstMenu.scss'

export default class FirstMenu extends React.Component {
  render () {
    return (
      <nav className={css.nav}>
        <Link href='/' className={[ css.navItem, css.navItemSelected ].join(' ')}>Home</Link>
        <Link href='/' className={css.navItem}>Job boards</Link>
        <Link href='/' className={css.navItem}>People</Link>
      </nav>
    )
  }
}
