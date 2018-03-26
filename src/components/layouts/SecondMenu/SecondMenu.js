import { Image, Link } from 'components/common'
import React from 'react'
import css from './SecondMenu.scss'

export default class SecondMenu extends React.Component {
  render () {
    return (
      <nav className={css.root}>
        <div className={css.section}>
          <div className={css.icons}>
            <Image
              className={css.iconsItem}
              icon={Image.ICONS.WALLET}
              color={Image.COLORS.BLACK}
              faded
            />
            <Image
              className={css.iconsItem}
              icon={Image.ICONS.SETTINGS}
              color={Image.COLORS.BLACK}
              faded
            />
            <Image
              className={css.iconsItem}
              icon={Image.ICONS.ACCOUNT}
              color={Image.COLORS.RED}
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
