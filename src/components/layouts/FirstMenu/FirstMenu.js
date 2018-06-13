import { Link } from 'components/common'
import React from 'react'
import css from './FirstMenu.scss'

const menuItems = [
  {
    href: '/',
    label: 'nav.home',
  },
  {
    href: '/',
    label: 'nav.jobBoards',
  },
  {
    href: '/',
    label: 'nav.people',
  },
]

export default class FirstMenu extends React.Component {

  renderItem = (item, index) => {
    const className = [ css.navItem ]
    if (index === 0) {
      // TODO @dkchv: implement selected
      className.push(css.navItemSelected)
    }
    return (
      <Link
        key={index}
        className={className.join(' ')}
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
