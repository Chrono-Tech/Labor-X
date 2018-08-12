import { Link } from 'components/common'
import React from 'react'
import css from './FirstMenu.scss'

const menuItems = [
  {
    href: '/dashboard',
    label: 'nav.home',
  },
  {
    href: '/job-boards',
    label: 'nav.jobBoards',
  },
  {
    href: '/people',
    label: 'nav.people',
  },
]

export default class FirstMenu extends React.Component {

  renderItem = (item, index) => {
    return (
      <Link
        key={index}
        className={css.navItem}
        activeClassName={css.navItemSelected}
        {...item}
      />
    )
  }

  render () {
    return (
      <nav className={css.nav}>
        {menuItems.map(this.renderItem)}
      </nav>
    )
  }
}
