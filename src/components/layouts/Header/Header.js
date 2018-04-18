import { Link, Tip } from 'components/common'
import React from 'react'
import FirstMenu from '../FirstMenu/FirstMenu'
import css from './Header.scss'

export default class Header extends React.Component {
  render () {
    const prefix = this.constructor.name

    return (
      <div className={css.root}>
        <div className={css.headerLeft}>
          <Link href='/' className={css.logo}>
            <img src='/static/images/labor-x-logo.svg' className={css.logoImg} />
          </Link>
          <FirstMenu />
        </div>
        <div className={css.headerRight}>
          <nav className={css.actions}>
            <Link href='/jobs/post' className={css.actionItem} label='nav.newJob' />
            <Link href='/' className={css.actionItem} label='nav.newBoard' />
          </nav>
          <div className={css.points}>
            <Tip
              title={`${prefix}.actionPoints`}
              tip={`${prefix}.actionPointsDescription`}
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
      </div>
    )
  }
}
