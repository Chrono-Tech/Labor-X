import { Link, Tip } from 'components/common'
import React from 'react'
import FirstMenu from '../FirstMenu/FirstMenu'
import css from './Header.scss'

export default class Header extends React.Component {
  render () {
    return (
      <div className={css.root}>
        <Link href='/' className={css.logo}>
          <img src='/static/images/labor-x-logo.svg' className={css.logoImg} />
        </Link>
        <FirstMenu />

        <nav className={css.actions}>
          <Link href='/' className={css.actionItem}>New job</Link>
          <Link href='/' className={css.actionItem}>New board</Link>
        </nav>
        <div className={css.points}>
          <Tip
            title='Action Points'
            tip='Our platform is using action points to prevent spam, abuse and other inappropriate behavior. Click on the icon to learn more.'
          >
            <img src='/static/images/icon-active-points.svg' className={css.pointsIcon} />
          </Tip>
          <span className={css.pointsValue}>70</span>
        </div>

        <div className={css.profile}>
          <div className={css.profileWrapper}>
            <img src='/static/temp/icon-profile.jpg' className={css.profileIcon} />
            <div className={css.profileCounter}>99</div>
          </div>
        </div>
      </div>
    )
  }
}
