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
          <Link href='/dashboard' className={css.link} label='nav.validation' />
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={css.link} label='nav.validationService' />
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={css.link} label='nav.worker' />
          <Link href='/dashboard' className={css.subLink}>To-Do</Link>
          <Link href='/dashboard' className={css.subLink} label='nav.applicationsAndOffers' />
          <Link href='/dashboard' className={css.subLink} label='nav.Opportunities' />
          <Link href='/dashboard' className={css.subLink} label='nav.completedJobs' />
        </div>
      </nav>
    )
  }
}
