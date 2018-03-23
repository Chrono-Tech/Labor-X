import { Icon, Link } from 'components/common'
import React from 'react'
import css from './SecondMenu.scss'

export default class SecondMenu extends React.Component {
  render () {
    return (
      <nav className={css.root}>
        <div className={css.section}>
          <div className={css.icons}>
            <Icon
              className={css.iconsItem}
              name={Icon.NAMES.WALLET}
              color={Icon.COLORS.BLACK}
              faded
            />
            <Icon
              className={css.iconsItem}
              name={Icon.NAMES.SETTINGS}
              color={Icon.COLORS.BLACK}
              faded
            />
            <Icon
              className={css.iconsItem}
              name={Icon.NAMES.ACCOUNT}
              color={Icon.COLORS.RED}
              faded
            />
            <span className={css.completed}>20%</span>
          </div>
        </div>
        <div className={css.section}>
          <div className={[ css.link, css.selected ].join(' ')}>Dashboard</div>
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={css.link}>VALIDATION</Link>
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={css.link}>VALIDATION SERVICE</Link>
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={css.link}>Worker</Link>
          <Link href='/dashboard' className={css.subLink}>To-Do</Link>
          <Link href='/dashboard' className={css.subLink}>Applications & Offers</Link>
          <Link href='/dashboard' className={css.subLink}>Opportunities</Link>
          <Link href='/dashboard' className={css.subLink}>Completed Jobs</Link>
        </div>
      </nav>
    )
  }
}
